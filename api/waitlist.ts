import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { waitlistSignups, insertWaitlistSignupSchema } from "./schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
  console.warn('BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID not set - subscribers will not be added to newsletter');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      console.log('Received signup data:', req.body);
      const validatedData = insertWaitlistSignupSchema.parse(req.body);
      
      // Check if email already exists
      const [existingSignup] = await db
        .select()
        .from(waitlistSignups)
        .where(eq(waitlistSignups.email, validatedData.email));

      if (existingSignup) {
        console.log('Duplicate email attempt:', validatedData.email);
        return res.status(400).json({ 
          error: "This email is already on the waitlist" 
        });
      }

      const [newSignup] = await db
        .insert(waitlistSignups)
        .values(validatedData)
        .returning();

      // Add to Beehiiv newsletter
      try {
        if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
          console.warn('Beehiiv not configured - skipping newsletter addition');
        } else {
          console.log('Adding to Beehiiv newsletter:', newSignup.email);
          
          const beehiivResponse = await fetch(`https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`
            },
            body: JSON.stringify({
              email: newSignup.email,
              reactivate_existing: true,
              send_welcome_email: true,
              utm_source: 'website',
              utm_campaign: 'waitlist',
              utm_medium: 'form',
              referring_site: 'contentalchemy.co',
              custom_fields: {
                name: newSignup.name,
                creator_type: newSignup.creatorType
              }
            })
          });
          
          if (beehiivResponse.ok) {
            const result = await beehiivResponse.json();
            console.log('Added to Beehiiv newsletter successfully:', result.id);
          } else {
            console.error('Beehiiv API error:', beehiivResponse.status, await beehiivResponse.text());
          }
        }
      } catch (beehiivError) {
        console.error('Failed to add to Beehiiv newsletter:', beehiivError);
        // Don't fail the signup if Beehiiv fails
      }

      return res.status(201).json(newSignup);
    } catch (error) {
      console.error('Error creating waitlist signup:', error);
      if (error instanceof z.ZodError) {
        console.log('Zod validation error:', error.errors);
        return res.status(400).json({ 
          error: "Invalid data", 
          details: error.errors 
        });
      }
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
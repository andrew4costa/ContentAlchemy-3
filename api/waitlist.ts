import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import { eq } from "drizzle-orm";
// @ts-ignore
import mailchimp from '@mailchimp/mailchimp_marketing';
import * as schema from "./schema";
import { waitlistSignups, insertWaitlistSignupSchema } from "./schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_SERVER_PREFIX) {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });
} else {
  console.warn('MAILCHIMP_API_KEY or MAILCHIMP_SERVER_PREFIX not set - list additions will not work');
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

      // Add to Mailchimp list
      try {
        if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX || !process.env.MAILCHIMP_LIST_ID) {
          console.warn('Mailchimp not configured - skipping list addition');
        } else {
          console.log('Adding to Mailchimp list:', newSignup.email);
          
          const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
            email_address: newSignup.email,
            status: 'subscribed',
            merge_fields: {
              FNAME: newSignup.name,
              CTYPE: newSignup.creatorType
            }
          });
          
          console.log('Added to Mailchimp list successfully:', response.id);
        }
      } catch (mailchimpError) {
        console.error('Failed to add to Mailchimp list:', mailchimpError);
        // Don't fail the signup if Mailchimp fails
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
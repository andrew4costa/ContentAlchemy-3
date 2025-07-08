import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";
import { waitlistSignups, insertWaitlistSignupSchema } from "../shared/schema";
import { eq } from "drizzle-orm";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

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
      const validatedData = insertWaitlistSignupSchema.parse(req.body);
      
      // Check if email already exists
      const [existingSignup] = await db
        .select()
        .from(waitlistSignups)
        .where(eq(waitlistSignups.email, validatedData.email));

      if (existingSignup) {
        return res.status(400).json({ 
          error: "This email is already on the waitlist" 
        });
      }

      const [newSignup] = await db
        .insert(waitlistSignups)
        .values(validatedData)
        .returning();

      return res.status(201).json(newSignup);
    } catch (error) {
      console.error('Error creating waitlist signup:', error);
      if (error instanceof z.ZodError) {
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
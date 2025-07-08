import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import { eq } from "drizzle-orm";
import { Resend } from 'resend';
import * as schema from "./schema";
import { waitlistSignups, insertWaitlistSignupSchema } from "./schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY not set - emails will not be sent');
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

      // Send welcome email
      try {
        if (!process.env.RESEND_API_KEY) {
          console.warn('RESEND_API_KEY not set - skipping email');
        } else {
          console.log('Sending welcome email to:', newSignup.email);
        }
        
        const emailResult = await resend.emails.send({
          from: 'ContentAlchemy <noreply@resend.dev>',
          to: [newSignup.email],
          subject: 'You\'re on the ContentAlchemy waitlist! 🎉',
          html: `
            <h1>Thanks for joining the waitlist! 🚀</h1>
            <p>Hi ${newSignup.name},</p>
            <p>Thank you for joining the ContentAlchemy waitlist. You'll receive updates about our progress and be the first to know when we launch. 📧</p>
            <p>Stay tuned! ✨</p>
            <p>Best,<br>The ContentAlchemy Team</p>
          `
        });
        
        console.log('Email sent successfully:', emailResult);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the signup if email fails
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
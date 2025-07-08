import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../schema";
import { waitlistSignups } from "../schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const signups = await db
      .select()
      .from(waitlistSignups)
      .orderBy(waitlistSignups.createdAt);

    // Convert to CSV
    const csvHeader = 'Email,Name,Creator Type,Joined Date\n';
    const csvRows = signups.map(signup => 
      `${signup.email},"${signup.name}","${signup.creatorType}","${signup.createdAt?.toISOString()}"`
    ).join('\n');

    const csv = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="waitlist-emails.csv"');
    return res.status(200).send(csv);
  } catch (error) {
    console.error('Error exporting waitlist:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
} 
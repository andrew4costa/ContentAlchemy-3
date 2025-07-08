import { users, waitlistSignups, type User, type InsertUser, type WaitlistSignup, type InsertWaitlistSignup } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistSignup(signup: InsertWaitlistSignup): Promise<WaitlistSignup>;
  getWaitlistSignups(): Promise<WaitlistSignup[]>;
  getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createWaitlistSignup(insertSignup: InsertWaitlistSignup): Promise<WaitlistSignup> {
    try {
      const [signup] = await db
        .insert(waitlistSignups)
        .values(insertSignup)
        .returning();
      return signup;
    } catch (error: any) {
      if (error.code === '23505' || error.message?.includes('duplicate key')) {
        throw new Error("Email already exists on waitlist");
      }
      throw error;
    }
  }

  async getWaitlistSignups(): Promise<WaitlistSignup[]> {
    return await db.select().from(waitlistSignups);
  }

  async getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined> {
    const [signup] = await db.select().from(waitlistSignups).where(eq(waitlistSignups.email, email));
    return signup || undefined;
  }
}

export const storage = new DatabaseStorage();

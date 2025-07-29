import { type User, type InsertUser, type PalmReading, type InsertPalmReading } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPalmReading(reading: InsertPalmReading): Promise<PalmReading>;
  getPalmReading(id: string): Promise<PalmReading | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private palmReadings: Map<string, PalmReading>;

  constructor() {
    this.users = new Map();
    this.palmReadings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPalmReading(insertReading: InsertPalmReading): Promise<PalmReading> {
    const id = randomUUID();
    const reading: PalmReading = { 
      ...insertReading, 
      id, 
      createdAt: new Date() 
    };
    this.palmReadings.set(id, reading);
    return reading;
  }

  async getPalmReading(id: string): Promise<PalmReading | undefined> {
    return this.palmReadings.get(id);
  }
}

export const storage = new MemStorage();

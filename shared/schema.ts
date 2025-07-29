import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const palmReadings = pgTable("palm_readings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  loveScore: integer("love_score").notNull(),
  moneyScore: integer("money_score").notNull(),
  healthScore: integer("health_score").notNull(),
  loveReading: text("love_reading").notNull(),
  moneyReading: text("money_reading").notNull(),
  healthReading: text("health_reading").notNull(),
  features: jsonb("features").notNull(),
  advice: jsonb("advice").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPalmReadingSchema = createInsertSchema(palmReadings).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPalmReading = z.infer<typeof insertPalmReadingSchema>;
export type PalmReading = typeof palmReadings.$inferSelect;

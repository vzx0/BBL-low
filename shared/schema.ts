import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quizResponses = pgTable("quiz_responses", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  ageRange: text("age_range"),
  bblExperience: text("bbl_experience"),
  mainGoals: text("main_goals").array(),
  bodyType: text("body_type"),
  buttType: text("butt_type"),
  flexibility: text("flexibility"),
  buttImprovements: text("butt_improvements").array(),
  underwearType: text("underwear_type"),
  bottomStyle: text("bottom_style"),
  painAreas: text("pain_areas").array(),
  exerciseFrequency: text("exercise_frequency"),
  stairsCondition: text("stairs_condition"),
  workRoutine: text("work_routine"),
  dailyActivity: text("daily_activity"),
  energyLevels: text("energy_levels"),
  eatingRoutine: text("eating_routine"),
  dietType: text("diet_type"),
  foodRestrictions: text("food_restrictions").array(),
  insecurityAreas: text("insecurity_areas").array(),
  intimacyInsecurities: text("intimacy_insecurities").array(),
  height: integer("height"),
  heightUnit: text("height_unit"),
  currentWeight: integer("current_weight"),
  weightUnit: text("weight_unit"),
  targetWeight: integer("target_weight"),
  age: integer("age"),
  workoutTime: text("workout_time"),
  workoutFrequency: text("workout_frequency"),
  selectedPlan: text("selected_plan"),
  couponCode: text("coupon_code"),
  bmiCategory: text("bmi_category"),
  fitnessScore: integer("fitness_score"),
  motivationLevel: text("motivation_level"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userAnalytics = pgTable("user_analytics", {
  id: serial("id").primaryKey(),
  quizResponseId: integer("quiz_response_id").references(() => quizResponses.id),
  fitnessLevel: text("fitness_level"),
  goalAlignment: integer("goal_alignment"),
  timeCommitment: text("time_commitment"),
  difficultyRecommendation: text("difficulty_recommendation"),
  nutritionScore: integer("nutrition_score"),
  bodyConfidenceScore: integer("body_confidence_score"),
  progressPrediction: text("progress_prediction"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;
export type UserAnalytics = typeof userAnalytics.$inferSelect;
export type InsertUserAnalytics = z.infer<typeof insertUserAnalyticsSchema>;

export const insertUserAnalyticsSchema = createInsertSchema(userAnalytics).omit({
  id: true,
  createdAt: true,
});

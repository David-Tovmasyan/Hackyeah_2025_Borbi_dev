import z from "zod";

export const UserIdSchema = z.uuid();
export type UserId = z.infer<typeof UserIdSchema>

export const UserSchema = z.object({
  id: UserIdSchema,
  username: z.string(),
  hp: z.int(),
  xp: z.int().describe("200xp = 1 lvl"),
  spentPrestige: z.int().describe("field should increment only if result is not greater than xp//200 + count of 7-days-in-row streaks"),
});
export type User = z.infer<typeof UserSchema>

// Schema dla danych onboardingu
export const CreateUserSchema = z.object({
  name: z.string().min(1),
  currentSteps: z.string().optional(),
  stepsGoal: z.number().min(0),
  eatingRegularity: z.enum(["irregular", "sometimes", "mostly", "regular", "planned"]),
  meals: z.array(z.any()).default([]),
  sleepRegularity: z.enum(["irregular", "mostly-regular", "regular", "very-regular", "shift-work"]),
  waterGoal: z.number().min(0).optional(),
  caloriesGoal: z.number().min(0).optional(),
  medicalConcerns: z.array(z.string()).default([]),
  motivation: z.string().optional(),
  notifications: z.object({
    meals: z.boolean().default(false),
    water: z.boolean().default(false),
    activity: z.boolean().default(false),
    sleep: z.boolean().default(false)
  }).optional()
});
export type CreateUser = z.infer<typeof CreateUserSchema>


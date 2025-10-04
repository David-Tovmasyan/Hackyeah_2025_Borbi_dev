import z from "zod";
import { UserIdSchema } from "./users.model";

export const SleepGoalIdSchema = z.uuid()

export const SleepGoalSchema = z.object({
  id: SleepGoalIdSchema,
  userId: UserIdSchema, 
  sleepMin: z.int().describe("Minimal sleep amount in minutes"), //sleep amount in minutes
  sleepMax: z.int().describe("Maximal sleep amount in minutes"), //sleep amount in minutes
  sleepEarliest: z.iso.time(),
  sleepLatest: z.iso.time(),
  dateSet: z.date(),
});

export type SleepGoal = z.infer<typeof SleepGoalSchema>;


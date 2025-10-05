import z from "zod";
import { UserIdSchema } from "./users.model";

export const SleepGoalIdSchema = z.uuid()
export type SleepGoalId = z.infer<typeof SleepGoalIdSchema>;

export const SleepGoalSchema = z.object({
  id: SleepGoalIdSchema,
  userId: UserIdSchema, 
  sleepEarliest: z.iso.time(),
  sleepLatest: z.iso.time(),
  dateSet: z.date(),
});

export type SleepGoal = z.infer<typeof SleepGoalSchema>;


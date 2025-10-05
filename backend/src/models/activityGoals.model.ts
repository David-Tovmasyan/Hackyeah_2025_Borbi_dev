import z from "zod";
import { UserIdSchema } from "./users.model";

export const ActivityGoalIdSchema = z.uuid()
export type ActivityGoalId = z.infer<typeof ActivityGoalIdSchema>;

export const ActivityGoalSchema = z.object({
  id: UserIdSchema,
  userId: UserIdSchema,
  stepsGoal: z.int(),
  // activityGoal: z.int("Activity time goal in minutes"),
  dateSet: z.date(),
 });

export type ActivityGoal = z.infer<typeof ActivityGoalSchema>;


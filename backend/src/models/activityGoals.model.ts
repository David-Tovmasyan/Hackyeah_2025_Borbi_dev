import z from "zod";
import { UserIdSchema } from "./users.model";

export const ActivityGoalIdSchema = z.uuid()
export type ActivityGoalId = z.infer<typeof ActivityGoalIdSchema>;

export const ActivityGoalSchema = z.object({
  id: UserIdSchema.optional(),
  userId: UserIdSchema,
  steps: z.int(),
  // activityGoal: z.int("Activity time goal in minutes"),
  dateSet: z.date().default(new Date()),
 });

export type ActivityGoal = z.infer<typeof ActivityGoalSchema>;


import z from "zod";
import { UserIdSchema } from "./users.model";

export const ActivityGoalIdSchema = z.uuid()

export const ActivityGoalSchema = z.object({
  id: UserIdSchema,
  userId: UserIdSchema,
  stepsGoal: z.int(),
  activityGoal: z.int("Activity time goal in minutes"),
  burnGoal: z.int(),
  dateSet: z.date(),
 });

export type ActivityGoal = z.infer<typeof ActivityGoalSchema>;


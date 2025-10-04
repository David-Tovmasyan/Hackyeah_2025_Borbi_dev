import z from "zod";
import { UserIdSchema } from "./users.model";

export const MealSchema = z.object({
  id: UserIdSchema,
  name: z.string(),
  note: z.string(),
  time: z.iso.time().describe("Time on which the notification is being sent."), //recommendation: set a time adequately to the usual time you need for the meal preparation
});

export type MealGoal = z.infer<typeof MealSchema>;


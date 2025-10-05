import z from "zod";
import { UserIdSchema } from "./users.model";


export const MealIdSchema = z.uuid()
export type MealId = z.infer<typeof MealIdSchema>;

export const MealSchema = z.object({
  id: MealIdSchema.optional(),
  userId: UserIdSchema,
  name: z.string(),
  note: z.string().nullable(),
  timeString: z.iso.time().describe("Time on which the notification is being sent."), //recommendation: set a time adequately to the usual time you need for the meal preparation
});

export type Meal = z.infer<typeof MealSchema>;
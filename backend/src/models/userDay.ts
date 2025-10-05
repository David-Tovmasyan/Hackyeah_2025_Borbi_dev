import z from "zod";
import { ActivityGoalIdSchema } from "./activityGoals.model";
import { SleepGoalIdSchema } from "./sleepGoals.model";

export const UserDayIdSchema = z.uuid()
export type UserDayId = z.infer<typeof UserDayIdSchema>

export const UserDaySchema = z.object({
    id: UserDayIdSchema,

    sleepGoalId: SleepGoalIdSchema,
    sleepStart: z.iso.time().describe("Time user went to sleep"),

    activityGoalId: ActivityGoalIdSchema, 
    steps: z.int(),
    // activity: z.int("Activity time goal in minutes"),

    mealsGoal: z.int(), //is being set on login and refreshed on meals quantity change
    meals: z.int(),
})

export type UserDay = z.infer<typeof UserDaySchema>
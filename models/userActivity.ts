import z from "zod";
import { ActivityGoalIdSchema } from "./activityGoals.model";
import { SleepGoalIdSchema } from "./sleepGoals.model";


export const UserActivitySchema = z.object({

    sleepGoalId: SleepGoalIdSchema,
    sleepStart: z.iso.time().describe("Time user went to sleep"),
    sleepAmount: z.int().describe("Sleep amount in minutes"), 


    activityGoalId: ActivityGoalIdSchema, 
    steps: z.int(),
    activity: z.int("Activity time goal in minutes"),
    burn: z.int(),

    mealsGoal: z.int(), //is being set on login and refreshed on meals quantity change
    meals: z.int(),
})
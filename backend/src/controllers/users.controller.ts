import { Express } from "express";
import { UserIdSchema } from "../models/users.model";
import { getUser } from "../services/users.service";
import z from "zod";
import { getUserSleepGoals } from "../services/sleepGoals.service";
import { getUserActivityGoals } from "../services/activityGoals.service";
import { getUserMeals } from "../services/mealGoals.service";

export const userControllerFactory = (app: Express) => {
    app.get("/user/:userId", (req, res) => {
        console.log(`Preferences for user ${req.params.userId} requested`);

        try {
            const userId = UserIdSchema.parse(req.params.userId);
            const userData = {
                ...getUser(userId),
                sleepGoal: getUserSleepGoals(userId),
                activityGoal: getUserActivityGoals(userId),
                meals: getUserMeals(userId)
            }
            res.status(200).send({ userData: userData });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const error = { issues: err.issues };
                res.status(400).send({ error: error });
            } else {
                res.status(500).send({ error: err });
            }
        }
    })
}
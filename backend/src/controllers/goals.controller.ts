import { Express } from "express";
import z from "zod";
import { ActivityGoalSchema } from "../models/activityGoals.model";
import { setUserActivityGoals } from "../services/activityGoals.service";
import { SleepGoalSchema } from "../models/sleepGoals.model";
import { setUserSleepGoals } from "../services/sleepGoals.service";


export const goalsControllerFactory = (app: Express) => {
    app.post("/goals/activity", (req, res) => {
        console.log(`Preferences for user ${req.body.userId} requested`);

        try {
            const activityGoal = ActivityGoalSchema.parse(req.body);
            const newActivityGoalId = setUserActivityGoals(activityGoal)
            res.status(200).send({id: newActivityGoalId});
        } catch (err) {
            if (err instanceof z.ZodError) {
                const error = { issues: err.issues };
                res.status(400).send({ error: error });
            } else {
                res.status(500).send({ error: err });
            }
        }
    })

    app.post("/goals/sleep", (req, res) => {
        console.log(`Preferences for user ${req.body.userId} requested`);

        try {
            const sleepGoal = SleepGoalSchema.parse(req.body);
            const newSleepGoalId = setUserSleepGoals(sleepGoal)
            res.status(200).send({id: newSleepGoalId});
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
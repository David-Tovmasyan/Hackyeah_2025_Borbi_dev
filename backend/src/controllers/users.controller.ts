import { Express } from "express";
import { UserIdSchema, CreateUserSchema } from "../models/users.model";
import { getUser, createUser, getUserOnboardingData, getUserProgress, updateUserProgress, getAllUsers, loginUser } from "../services/users.service";
import z from "zod";
import { getUserSleepGoals } from "../services/sleepGoals.service";
import { getUserActivityGoals } from "../services/activityGoals.service";
import { getUserMeals } from "../services/mealGoals.service";

export const userControllerFactory = (app: Express) => {
    // Tworzenie nowego użytkownika z danymi onboardingu
    app.post("/user", (req, res) => {
        console.log('Creating new user with onboarding data:', req.body);

        try {
            const userData = CreateUserSchema.parse(req.body);
            const newUser = createUser(userData);
            res.status(201).send({ success: true, user: newUser });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const error = { issues: err.issues };
                res.status(400).send({ error: error });
            } else {
                console.error('Error creating user:', err);
                res.status(500).send({ error: err });
            }
        }
    });

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
    });

    // Endpoint do pobrania danych onboardingu użytkownika
    app.get("/user/:userId/onboarding", (req: any, res: any) => {
        console.log(`Onboarding data for user ${req.params.userId} requested`);

        try {
            const userId = UserIdSchema.parse(req.params.userId);
            const onboardingData = getUserOnboardingData(userId);
            
            if (!onboardingData) {
                res.status(404).send({ error: 'Onboarding data not found' });
                return;
            }
            
            res.status(200).send({ onboardingData: onboardingData });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const error = { issues: err.issues };
                res.status(400).send({ error: error });
            } else {
                res.status(500).send({ error: err });
            }
        }
    });

    // Endpoint logowania użytkownika
    app.post("/login", (req: any, res: any) => {
        console.log('Login attempt:', req.body);

        try {
            const { username } = req.body;
            
            if (!username) {
                res.status(400).send({ error: 'Username is required' });
                return;
            }

            const user = loginUser(username);
            
            if (!user) {
                res.status(404).send({ error: 'User not found' });
                return;
            }

            const progress = getUserProgress(user.id);
            const onboardingData = getUserOnboardingData(user.id);
            
            res.status(200).send({ 
                user: user,
                progress: progress,
                onboardingData: onboardingData
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).send({ error: err });
        }
    });

    // Endpoint do pobrania progress użytkownika
    app.get("/user/:userId/progress", (req: any, res: any) => {
        console.log(`Progress for user ${req.params.userId} requested`);

        try {
            const userId = UserIdSchema.parse(req.params.userId);
            const progress = getUserProgress(userId);
            
            if (!progress) {
                res.status(404).send({ error: 'Progress not found' });
                return;
            }
            
            res.status(200).send({ progress: progress });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const error = { issues: err.issues };
                res.status(400).send({ error: error });
            } else {
                res.status(500).send({ error: err });
            }
        }
    });

    // Endpoint do aktualizacji progress użytkownika
    app.put("/user/:userId/progress", (req: any, res: any) => {
        console.log(`Updating progress for user ${req.params.userId}:`, req.body);

        try {
            const userId = UserIdSchema.parse(req.params.userId);
            const updatedProgress = updateUserProgress(userId, req.body);
            
            if (!updatedProgress) {
                res.status(404).send({ error: 'User progress not found' });
                return;
            }
            
            res.status(200).send({ progress: updatedProgress });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const error = { issues: err.issues };
                res.status(400).send({ error: error });
            } else {
                res.status(500).send({ error: err });
            }
        }
    });

    // Endpoint do pobrania listy wszystkich użytkowników
    app.get("/users", (req: any, res: any) => {
        console.log('All users requested');
        
        try {
            const users = getAllUsers();
            res.status(200).send({ users: users });
        } catch (err) {
            console.error('Get users error:', err);
            res.status(500).send({ error: err });
        }
    });
}
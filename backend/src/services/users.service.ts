import e from "express";
import { User, UserId, CreateUser } from "../models/users.model";

const userRepository: User[] = [
    {
        id: "123e4567-e89b-12d3-a456-426614174000",
        username: "user",
        hp: 100,
        xp: 1150,
        spentPrestige: 0,
    },
    {
        id: "323e4567-e89b-12d3-a456-426614174420",
        username: "borbi",
        hp: 80,
        xp: 2300,
        spentPrestige: 0,
    },
]

// Mock storage dla danych onboardingu
const onboardingDataStorage: { [userId: string]: CreateUser } = {};

// Mock storage dla progress użytkowników
interface UserProgress {
    steps: number;
    stepsGoal: number;
    water: number;
    waterGoal: number;
    meals: number;
    mealsGoal: number;
    streak: number;
    lastActiveDate: string;
}

const userProgressStorage: { [userId: string]: UserProgress } = {
    "123e4567-e89b-12d3-a456-426614174000": {
        steps: 8500,
        stepsGoal: 10000,
        water: 6,
        waterGoal: 8,
        meals: 2,
        mealsGoal: 3,
        streak: 15,
        lastActiveDate: new Date().toISOString().split('T')[0]
    },
    "323e4567-e89b-12d3-a456-426614174420": {
        steps: 12000,
        stepsGoal: 15000,
        water: 8,
        waterGoal: 10,
        meals: 3,
        mealsGoal: 4,
        streak: 7,
        lastActiveDate: new Date().toISOString().split('T')[0]
    }
};

let userIdCounter = 1000;

export const getUser = (
  userId: UserId,
): User | undefined => {
  return userRepository.find((e)=>e.id==userId)
};

export const createUser = (userData: CreateUser): User => {
    const newUserId = `mock-user-${userIdCounter++}`;
    
    const newUser: User = {
        id: newUserId,
        username: userData.name,
        hp: 100,
        xp: 0,
        spentPrestige: 0
    };

    userRepository.push(newUser);
    
    // Zapisz dane onboardingu w mock storage
    onboardingDataStorage[newUserId] = userData;
    
    // Inicjalizuj progress dla nowego użytkownika
    initializeUserProgress(newUserId, userData);
    
    console.log('User created with mock data:', { user: newUser, onboardingData: userData });
    
    return newUser;
};

export const getUserOnboardingData = (userId: UserId): CreateUser | undefined => {
    return onboardingDataStorage[userId];
};

export const getUserProgress = (userId: UserId): UserProgress | undefined => {
    return userProgressStorage[userId];
};

export const updateUserProgress = (userId: UserId, progress: Partial<UserProgress>): UserProgress | undefined => {
    const currentProgress = userProgressStorage[userId];
    if (!currentProgress) return undefined;
    
    const updatedProgress = { ...currentProgress, ...progress };
    userProgressStorage[userId] = updatedProgress;
    
    console.log('Updated user progress:', { userId, progress: updatedProgress });
    return updatedProgress;
};

export const getAllUsers = (): User[] => {
    return userRepository;
};

export const loginUser = (username: string): User | undefined => {
    const user = userRepository.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user) {
        console.log('User logged in:', user.username);
    }
    return user;
};

export const updateUser = (
  user: User,
) => {
    const index = userRepository.findIndex((e)=>e.id==user.id)
    if (index==-1) return
    userRepository[index] = {...userRepository[index], ...user};
};

// Inicjalizacja progress dla nowych użytkowników
const initializeUserProgress = (userId: string, onboardingData: CreateUser) => {
    userProgressStorage[userId] = {
        steps: 0,
        stepsGoal: onboardingData.stepsGoal,
        water: 0,
        waterGoal: onboardingData.waterGoal || 8,
        meals: 0,
        mealsGoal: 3,
        streak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0]
    };
};

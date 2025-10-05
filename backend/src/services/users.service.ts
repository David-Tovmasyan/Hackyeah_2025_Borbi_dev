import e from "express";
import { User, UserId } from "../models/users.model";

const userRepository = [
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

export const getUser = (
  userId: UserId,
): User | undefined => {
  return userRepository.find((e)=>e.id==userId)
};

export const updateUser = (
  user: User,
) => {
    const index = userRepository.findIndex((e)=>e.id==user.id)
    if (index==-1) return
    userRepository[index] = {...userRepository[index], ...user};
};

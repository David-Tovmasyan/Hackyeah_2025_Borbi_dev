import { Meal, MealId } from "../models/meals.model";
import { UserId } from "../models/users.model";


const mealRepository : Array<Meal> = [
    {
        id: "323e4567-e89b-12d3-a456-426614174420",
        userId: "323e4567-e89b-12d3-a456-426614174420",
        name: "śniadanie",
        note: "japuko",
        timeString: "8:00"
    },
    {
        id: "f1a86c24-df10-4932-8039-326e9da5516d",
        userId: "323e4567-e89b-12d3-a456-426614174420",
        name: "II śniadanie",
        note: "dwa japuka",
        timeString: "12:00"
    },
    {
        id: "c9d66fce-ae71-4b48-bb98-27e8d158ef49",
        userId: "323e4567-e89b-12d3-a456-426614174420",
        name: "lunch",
        note: "słonina ze słonia",
        timeString: "15:00"
    },
    {
        id: "601eb621-e29d-4e7d-bb5b-3efc37e66249",
        userId: "323e4567-e89b-12d3-a456-426614174420",
        name: "wieczerza",
        note: "chlep i wino",
        timeString: "19:00"
    },
]

export const getUserMeals = (
  userId: UserId,
): Array<Meal> => {
  return mealRepository.filter((e)=>e.userId == userId)
};

export const getMeal = (
    mealId: MealId
): Meal | undefined => {
    return mealRepository.find(e=>e.id == mealId)
}

export const setUserMeal = (
    meal: Partial<Meal>
) => {                                  
    const index = mealRepository.findIndex(e=>e.id==meal.id)
    if (index==-1) return
    mealRepository[index] = {...mealRepository[index], ...meal}
};

export const createUserMeal = (
    meal: Meal
) => {
    meal.id = crypto.randomUUID();
    mealRepository.push(meal)
    return meal.id
};

export const deleteUserMeal = (
    mealId: MealId
) => {
    const index = mealRepository.findIndex((e)=>e.id==mealId);
    if (index > -1) mealRepository.splice(index, 1); 
}
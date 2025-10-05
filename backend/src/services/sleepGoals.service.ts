import { SleepGoal } from "../models/sleepGoals.model";
import { UserId } from "../models/users.model";
import { compareGoalDates } from "../utils/utils";

const sleepGoalRepository : Array<SleepGoal> = [
    {
        id: "b9d325a6-93a4-4f0d-8181-0e40e53dcab6",
        userId: "123e4567-e89b-12d3-a456-426614174000", 
        sleepEarliest: "21:00",
        sleepLatest: '22:00',
        dateSet: new Date(2025,10,1),
    },
]

export const getUserSleepGoals = (
  userId: UserId,
): SleepGoal | undefined => {
  return sleepGoalRepository.filter((e)=>e.userId==userId).sort(compareGoalDates).reverse()[0]
};

export const setUserSleepGoals = (
  sleepGoal: SleepGoal
) => {
    const dateNoTime = new Date().setHours(0,0,0,0);
    const index = sleepGoalRepository.findIndex((e)=>new Date(e.dateSet).getTime() == dateNoTime)
    if (index==-1){
      sleepGoalRepository.push(sleepGoal)
    } else {
      sleepGoalRepository[index] = {...sleepGoalRepository[index], ...sleepGoal}
    }
};

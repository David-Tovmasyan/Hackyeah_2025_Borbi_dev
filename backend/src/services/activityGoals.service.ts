import { ActivityGoal } from "../models/activityGoals.model";
import { UserId } from "../models/users.model";
import { compareGoalDates } from "../utils/utils";

const activityGoalRepository : Array<ActivityGoal> = [
    {
        id: "79a50314-2e0a-431f-8802-83e1c9fbc2a9",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        stepsGoal: 10000,
        // activityGoal: 30,
        dateSet: new Date(2025,10,1),
    },
]

export const getUserActivityGoals = (
  userId: UserId,
): ActivityGoal | undefined => {
  return activityGoalRepository.filter((e)=>{e.userId==userId}).sort(compareGoalDates).reverse()[0]
}


export const setUserActivityGoals = (
  activityGoal: ActivityGoal
) => {
    const dateNoTime = new Date().setHours(0,0,0,0);
    const index = activityGoalRepository.findIndex((e)=>new Date(e.dateSet).getTime() == dateNoTime)
    if (index==-1){
      activityGoalRepository.push(activityGoal)
    } else {
      activityGoalRepository[index] = {...activityGoalRepository[index], ...activityGoal}
    }
};

export function compareGoalDates(a: any, b: any) {
  return a.dateSet.getTime() - b.dateSet.getTime();
}

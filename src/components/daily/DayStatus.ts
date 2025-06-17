
export type DayStatus = 'unlocked' | 'tomorrow' | 'locked';

export const getDayStatus = (dayNumber: number, daysUnlocked: number): DayStatus => {
  if (dayNumber <= daysUnlocked) {
    return 'unlocked';
  } else if (dayNumber === daysUnlocked + 1) {
    return 'tomorrow';
  } else {
    return 'locked';
  }
};

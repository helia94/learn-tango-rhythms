
import { TranslationKey } from '../translations';

export interface Assignment {
  content: TranslationKey;
  audioTitle?: TranslationKey;
  audioDescription?: TranslationKey;
  fullSong?: TranslationKey;
  description?: TranslationKey;
  bandonionSolos?: TranslationKey;
  violinSolos?: TranslationKey;
  singerSolo?: TranslationKey;
}

export const assignments: Record<string, Assignment> = {
  'day1': {
    content: 'exercises.dancingSmallBig.daily.day1.content'
  },
  'day2': {
    content: 'exercises.dancingSmallBig.daily.day2.content'
  },
  'day3': {
    content: 'exercises.dancingSmallBig.daily.day3.content'
  },
  'day4': {
    content: 'exercises.dancingSmallBig.daily.day4.content'
  },
  'day5': {
    content: 'exercises.dancingSmallBig.daily.day5.content'
  },
  'day6': {
    content: 'exercises.dancingSmallBig.daily.day6.content'
  },
  'day7': {
    content: 'exercises.dancingSmallBig.daily.day7.content'
  },
  'weekly-assignment-1': {
    content: 'exercises.dancingSmallBig.assignment1'
  },
  'weekly-assignment-2': {
    content: 'exercises.dancingSmallBig.assignment2'
  },
  'weekly-assignment-3': {
    content: 'exercises.dancingSmallBig.assignment3'
  }
};

// Helper function to get assignment by key
export const getAssignment = (key: string): Assignment | undefined => {
  return assignments[key];
};

// Get all weekly assignments
export const getWeeklyAssignments = (): Assignment[] => {
  return [
    assignments['weekly-assignment-1'],
    assignments['weekly-assignment-2'],
    assignments['weekly-assignment-3']
  ];
};


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
    content: 'exercises.dancingFastSlow.daily.day1.task', // Changed from content to task
    audioTitle: 'exercises.dancingFastSlow.daily.day1.audioTitle',
    audioDescription: 'exercises.dancingFastSlow.daily.day1.audioDescription',
    fullSong: 'exercises.dancingFastSlow.daily.day1.fullSong'
  },
  'day2': {
    content: 'exercises.dancingFastSlow.daily.day2.task', // Changed from content to task
    description: 'exercises.dancingFastSlow.daily.day2.description',
    bandonionSolos: 'exercises.dancingFastSlow.daily.day2.bandonionSolos',
    violinSolos: 'exercises.dancingFastSlow.daily.day2.violinSolos',
    singerSolo: 'exercises.dancingFastSlow.daily.day2.singerSolo'
  },
  'day3': {
    content: 'exercises.dancingFastSlow.daily.day3.task', // Changed from content to task
    description: 'exercises.dancingFastSlow.daily.day3.description'
  },
  'day4': {
    content: 'exercises.dancingFastSlow.daily.day4.task', // Changed from content to task
    description: 'exercises.dancingFastSlow.daily.day4.description'
  },
  'day5': {
    content: 'exercises.dancingFastSlow.daily.day5.task' // Changed from content to task
  },
  'day6': {
    content: 'exercises.dancingFastSlow.daily.day6.task' // Changed from content to task
  },
  'day7': {
    content: 'exercises.dancingFastSlow.daily.day7.task' // Changed from content to task
  },
  'weekly-assignment-1': {
    content: 'exercises.dancingFastSlow.assignment1'
  },
  'weekly-assignment-2': {
    content: 'exercises.dancingFastSlow.assignment2'
  },
  'weekly-assignment-3': {
    content: 'exercises.dancingFastSlow.assignment3'
  },
  'weekly-assignment-4': {
    content: 'exercises.dancingFastSlow.assignment4'
  },
  'walking-practice': {
    content: 'exercises.dancingFastSlow.practicedWalking'
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
    assignments['weekly-assignment-3'],
    assignments['weekly-assignment-4']
  ];
};

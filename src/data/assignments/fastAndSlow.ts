
import { TranslationKey } from './translations';

export interface Assignment {
  content: TranslationKey;
  task: TranslationKey;
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
    content: 'daily.day1.content',
    audioTitle: 'daily.day1.audioTitle',
    audioDescription: 'daily.day1.audioDescription',
    fullSong: 'daily.day1.fullSong',
    task: 'daily.day1.task'
  },
  'day2': {
    content: 'daily.day2.content',
    description: 'daily.day2.description',
    bandonionSolos: 'daily.day2.bandonionSolos',
    violinSolos: 'daily.day2.violinSolos',
    singerSolo: 'daily.day2.singerSolo',
    task: 'daily.day2.task'
  },
  'day3': {
    content: 'daily.day3.content',
    description: 'daily.day3.description',
    task: 'daily.day3.task'
  },
  'day4': {
    content: 'daily.day4.content',
    description: 'daily.day4.description',
    task: 'daily.day4.task'
  },
  'day5': {
    content: 'daily.day5.content',
    task: 'daily.day5.task'
  },
  'day6': {
    content: 'daily.day6.content',
    task: 'daily.day6.task'
  },
  'day7': {
    content: 'daily.day7.content',
    task: 'daily.day7.task'
  },
  'weekly-assignment-1': {
    content: 'exercises.dancingFastSlow.assignment1',
    task: 'exercises.dancingFastSlow.assignment1'
  },
  'weekly-assignment-2': {
    content: 'exercises.dancingFastSlow.assignment2',
    task: 'exercises.dancingFastSlow.assignment2'
  },
  'weekly-assignment-3': {
    content: 'exercises.dancingFastSlow.assignment3',
    task: 'exercises.dancingFastSlow.assignment3'
  },
  'weekly-assignment-4': {
    content: 'exercises.dancingFastSlow.assignment4',
    task: 'exercises.dancingFastSlow.assignment4'
  },
  'walking-practice': {
    content: 'exercises.dancingFastSlow.practicedWalking',
    task: 'exercises.dancingFastSlow.practicedWalking'
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

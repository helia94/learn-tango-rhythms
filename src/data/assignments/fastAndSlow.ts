
import { TranslationKey } from '../translations';

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
    content: 'exercises.dancingFastSlow.daily.day1.content',
    audioTitle: 'exercises.dancingFastSlow.daily.day1.audioTitle',
    audioDescription: 'exercises.dancingFastSlow.daily.day1.audioDescription',
    fullSong: 'exercises.dancingFastSlow.daily.day1.fullSong',
    task: 'exercises.dancingFastSlow.daily.day1.task'
  },
  'day2': {
    content: 'exercises.dancingFastSlow.daily.day2.content',
    description: 'exercises.dancingFastSlow.daily.day2.description',
    bandonionSolos: 'exercises.dancingFastSlow.daily.day2.bandonionSolos',
    violinSolos: 'exercises.dancingFastSlow.daily.day2.violinSolos',
    singerSolo: 'exercises.dancingFastSlow.daily.day2.singerSolo',
    task: 'exercises.dancingFastSlow.daily.day2.task'
  },
  'day3': {
    content: 'exercises.dancingFastSlow.daily.day3.content',
    description: 'exercises.dancingFastSlow.daily.day3.description',
    task: 'exercises.dancingFastSlow.daily.day3.task'
  },
  'day4': {
    content: 'exercises.dancingFastSlow.daily.day4.content',
    description: 'exercises.dancingFastSlow.daily.day4.description',
    task: 'exercises.dancingFastSlow.daily.day4.task'
  },
  'day5': {
    content: 'exercises.dancingFastSlow.daily.day5.content',
    task: 'exercises.dancingFastSlow.daily.day5.task'
  },
  'day6': {
    content: 'exercises.dancingFastSlow.daily.day6.content',
    task: 'exercises.dancingFastSlow.daily.day6.task'
  },
  'day7': {
    content: 'exercises.dancingFastSlow.daily.day7.content',
    task: 'exercises.dancingFastSlow.daily.day7.task'
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

import { Assignment } from '@/data/assignments/fastAndSlow';

// Daily assignments for Dancing High vs Low topic
export const day1Assignment: Assignment = {
  content: 'exercises.dancingHighLow.daily.day1.content',
  task: 'exercises.dancingHighLow.daily.day1.task'
};

export const day2Assignment: Assignment = {
  content: 'exercises.dancingHighLow.daily.day2.content',
  task: 'exercises.dancingHighLow.daily.day2.task'
};

export const day3Assignment: Assignment = {
  content: 'exercises.dancingHighLow.daily.day3.content',
  task: 'exercises.dancingHighLow.daily.day3.task'
};

export const day4Assignment: Assignment = {
  content: 'exercises.dancingHighLow.daily.day4.content',
  task: 'exercises.dancingHighLow.daily.day4.task'
};

export const day5Assignment: Assignment = {
  content: 'exercises.dancingHighLow.daily.day5.content',
  task: 'exercises.dancingHighLow.daily.day5.task'
};

export const day6Assignment: Assignment = {
  content: 'exercises.dancingHighLow.daily.day6.content',
  task: 'exercises.dancingHighLow.daily.day6.task'
};

export const day7Assignment: Assignment = {
  content: 'exercises.dancingHighLow.daily.day7.content',
  task: 'exercises.dancingHighLow.daily.day7.task'
};

// Weekly assignments
export const weeklyAssignment1: Assignment = {
  content: 'exercises.dancingHighLow.assignment1',
  task: 'exercises.dancingHighLow.assignment1'
};

export const weeklyAssignment2: Assignment = {
  content: 'exercises.dancingHighLow.assignment2',
  task: 'exercises.dancingHighLow.assignment2'
};

export const weeklyAssignment3: Assignment = {
  content: 'exercises.dancingHighLow.assignment3',
  task: 'exercises.dancingHighLow.assignment3'
};

// Helper function to get assignment by key
export const getAssignment = (key: string): Assignment | null => {
  const assignments: Record<string, Assignment> = {
    'day1': day1Assignment,
    'day2': day2Assignment,
    'day3': day3Assignment,
    'day4': day4Assignment,
    'day5': day5Assignment,
    'day6': day6Assignment,
    'day7': day7Assignment,
    'weekly-assignment-1': weeklyAssignment1,
    'weekly-assignment-2': weeklyAssignment2,
    'weekly-assignment-3': weeklyAssignment3,
  };
  
  return assignments[key] || null;
};

// Helper function to get weekly assignments
export const getWeeklyAssignments = () => [
  { key: 'weekly-assignment-1', assignment: weeklyAssignment1 },
  { key: 'weekly-assignment-2', assignment: weeklyAssignment2 },
  { key: 'weekly-assignment-3', assignment: weeklyAssignment3 },
];

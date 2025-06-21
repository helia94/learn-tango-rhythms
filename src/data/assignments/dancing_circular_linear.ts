
import { Assignment } from '@/data/assignments/fastAndSlow';

// Daily assignments for Dancing Circular vs Linear topic
export const day1Assignment: Assignment = {
  content: 'exercises.dancingCircularLinear.daily.day1.task'
};

export const day2Assignment: Assignment = {
  content: 'exercises.dancingCircularLinear.daily.day2.task'
};

export const day3Assignment: Assignment = {
  content: 'exercises.dancingCircularLinear.daily.day3.task'
};

// Weekly assignments
export const weeklyAssignment1: Assignment = {
  content: 'exercises.dancingCircularLinear.assignment1'
};

export const weeklyAssignment2: Assignment = {
  content: 'exercises.dancingCircularLinear.assignment2'
};

// Helper function to get assignment by key
export const getAssignment = (key: string): Assignment | null => {
  const assignments: Record<string, Assignment> = {
    'day1': day1Assignment,
    'day2': day2Assignment,
    'day3': day3Assignment,
    'weekly-assignment-1': weeklyAssignment1,
    'weekly-assignment-2': weeklyAssignment2,
  };
  
  return assignments[key] || null;
};

// Helper function to get weekly assignments
export const getWeeklyAssignments = () => [
  { key: 'weekly-assignment-1', assignment: weeklyAssignment1 },
  { key: 'weekly-assignment-2', assignment: weeklyAssignment2 },
];

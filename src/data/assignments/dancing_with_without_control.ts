
import { Assignment } from './fastAndSlow';

export interface DancingWithWithoutControlAssignment extends Assignment {}

const assignments: Record<string, DancingWithWithoutControlAssignment> = {
  day1: {
    id: 'day1',
    content: 'exercises.dancingWithWithoutControl.daily.day1.task',
    type: 'practice'
  },
  day2: {
    id: 'day2', 
    content: 'exercises.dancingWithWithoutControl.daily.day2.task',
    type: 'practice'
  },
  day3: {
    id: 'day3',
    content: 'exercises.dancingWithWithoutControl.daily.day3.task', 
    type: 'practice'
  },
  day4: {
    id: 'day4',
    content: 'exercises.dancingWithWithoutControl.daily.day4.task',
    type: 'practice'
  },
  'weekly-assignment-1': {
    id: 'weekly-assignment-1',
    content: 'exercises.dancingWithWithoutControl.assignment1',
    type: 'weekly'
  },
  'weekly-assignment-2': {
    id: 'weekly-assignment-2', 
    content: 'exercises.dancingWithWithoutControl.assignment2',
    type: 'weekly'
  }
};

export const getAssignment = (id: string): DancingWithWithoutControlAssignment | undefined => {
  return assignments[id];
};

export const getWeeklyAssignments = () => {
  return [
    { id: 'weekly-assignment-1', assignment: assignments['weekly-assignment-1'] },
    { id: 'weekly-assignment-2', assignment: assignments['weekly-assignment-2'] }
  ];
};

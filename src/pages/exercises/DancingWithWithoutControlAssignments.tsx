
import React from 'react';
import AllAssignmentsPage from '@/components/AllAssignmentsPage';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments/dancing_with_without_control';

const DancingWithWithoutControlAssignments = () => {
  const weeklyAssignments = getWeeklyAssignments().map(item => item.assignment);

  return (
    <AllAssignmentsPage
      titleKey="exercises.dancingWithWithoutControl.allAssignments"
      descriptionKey="exercises.dancingWithWithoutControl.assignmentsDescription"
      backRoute="/exercises/dancing-with-without-control"
      weeklyAssignments={weeklyAssignments}
      getAssignment={getAssignment}
      topicName="dancing-with-without-control"
      topicIndex={4}
      totalDays={4}
    />
  );
};

export default DancingWithWithoutControlAssignments;

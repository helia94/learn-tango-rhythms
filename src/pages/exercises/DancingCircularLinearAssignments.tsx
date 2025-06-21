
import React from 'react';
import AllAssignmentsPage from '@/components/AllAssignmentsPage';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments/dancing_circular_linear';

const DancingCircularLinearAssignments = () => {
  const weeklyAssignments = getWeeklyAssignments().map(item => item.assignment);

  return (
    <AllAssignmentsPage
      titleKey="exercises.dancingCircularLinear.allAssignments"
      descriptionKey="exercises.dancingCircularLinear.assignmentsDescription"
      backRoute="/exercises/dancing-circular-linear"
      weeklyAssignments={weeklyAssignments}
      getAssignment={getAssignment}
      topicName="dancing-circular-linear"
      topicIndex={3}
      totalDays={3}
    />
  );
};

export default DancingCircularLinearAssignments;


import React from 'react';
import AllAssignmentsPage from '@/components/AllAssignmentsPage';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments/dancing_high_low';

const DancingHighLowAssignments = () => {
  const weeklyAssignments = getWeeklyAssignments();

  return (
    <AllAssignmentsPage
      titleKey="exercises.dancingHighLow.allAssignments"
      descriptionKey="exercises.dancingHighLow.assignmentsDescription"
      backRoute="/exercises/dancing-high-low"
      weeklyAssignments={weeklyAssignments}
      getAssignment={getAssignment}
      topicName="dancing-high-low"
      topicIndex={2}
    />
  );
};

export default DancingHighLowAssignments;

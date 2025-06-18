
import React from 'react';
import AllAssignmentsPage from '@/components/AllAssignmentsPage';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments/fastAndSlow';

const DancingFastSlowAssignments = () => {
  const weeklyAssignments = getWeeklyAssignments();

  return (
    <AllAssignmentsPage
      titleKey="exercises.dancingFastSlow.allAssignments"
      descriptionKey="exercises.dancingFastSlow.assignmentsDescription"
      backRoute="/exercises/dancing-fast-slow"
      weeklyAssignments={weeklyAssignments}
      getAssignment={getAssignment}
      topicName="dancing-fast-slow"
      topicIndex={0}
    />
  );
};

export default DancingFastSlowAssignments;


import React from 'react';
import AllAssignmentsPage from '@/components/AllAssignmentsPage';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments/smallAndBig';

const DancingSmallBigAssignments = () => {
  const weeklyAssignments = getWeeklyAssignments();

  return (
    <AllAssignmentsPage
      titleKey="exercises.dancingSmallBig.allAssignments"
      descriptionKey="exercises.dancingSmallBig.assignmentsDescription"
      backRoute="/exercises/dancing-small-big"
      weeklyAssignments={weeklyAssignments}
      getAssignment={getAssignment}
      topicName="dancing-small-big"
      topicIndex={1}
    />
  );
};

export default DancingSmallBigAssignments;

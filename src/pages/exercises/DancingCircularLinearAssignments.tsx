import React from 'react';
import AllAssignmentsPage from '@/components/AllAssignmentsPage';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments/dancing_circular_linear';
import { TOPIC_CONFIG } from '@/config/topics';

const DancingCircularLinearAssignments = () => {
  const weeklyAssignments = getWeeklyAssignments().map(item => item.assignment);
  const topic = TOPIC_CONFIG.DANCING_CIRCULAR_LINEAR;

  return (
    <AllAssignmentsPage
      titleKey="exercises.dancingCircularLinear.allAssignments"
      descriptionKey="exercises.dancingCircularLinear.assignmentsDescription"
      backRoute="/exercises/dancing-circular-linear"
      weeklyAssignments={weeklyAssignments}
      getAssignment={getAssignment}
      topicName={topic.key}
      topicIndex={topic.index}
      totalDays={topic.totalDays}
    />
  );
};

export default DancingCircularLinearAssignments;

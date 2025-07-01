import React from 'react';
import AllAssignmentsPage from '@/components/AllAssignmentsPage';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments/dancing_high_low';
import { TOPIC_CONFIG } from '@/config/topics';

const DancingHighLowAssignments = () => {
  const weeklyAssignments = getWeeklyAssignments().map(item => item.assignment);
  const topic = TOPIC_CONFIG.DANCING_HIGH_LOW;

  return (
    <AllAssignmentsPage
      titleKey="exercises.dancingHighLow.allAssignments"
      descriptionKey="exercises.dancingHighLow.assignmentsDescription"
      backRoute="/exercises/dancing-high-low"
      weeklyAssignments={weeklyAssignments}
      getAssignment={getAssignment}
      topicName={topic.key}
      topicIndex={topic.index}
      totalDays={topic.totalDays}
    />
  );
};

export default DancingHighLowAssignments;

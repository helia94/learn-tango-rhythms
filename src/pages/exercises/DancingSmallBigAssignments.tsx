
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import AssignmentList from '@/components/AssignmentList';
import { getWeeklyAssignments, assignments } from '@/data/assignments/smallAndBig';

const DancingSmallBigAssignments = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  // Get daily assignments (Day 1-7)
  const dailyAssignments = [1, 2, 3, 4, 5, 6, 7].map(dayNumber => ({
    id: `day${dayNumber}`,
    content: assignments[`day${dayNumber}`].content,
    task: assignments[`day${dayNumber}`].task
  }));

  // Get weekly assignments
  const weeklyAssignments = getWeeklyAssignments();
  const weeklyAssignmentsList = weeklyAssignments.map((assignment, index) => ({
    id: `weekly-assignment-${index + 1}`,
    content: assignment.content,
    task: assignment.task
  }));

  // Combine all assignments
  const allAssignments = [...dailyAssignments, ...weeklyAssignmentsList];

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader 
        title={t('exercises.dancingSmallBig.allAssignments' as any)} 
        backRoute="/exercises/dancing-small-big"
      />
      
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <p className="text-lg text-warm-brown leading-relaxed">
            {t('exercises.dancingSmallBig.assignmentsDescription' as any)}
          </p>
        </div>

        {/* Daily Assignments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-display text-gray-700 mb-6">Daily Assignments (Day 1-7)</h2>
          <AssignmentList 
            assignments={dailyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="dancing-small-big-daily"
            topicName="dancing-small-big"
            topicIndex={1}
          />
        </div>

        {/* Weekly Assignments Section */}
        <div>
          <h2 className="text-2xl font-display text-gray-700 mb-6">Weekly Assignments</h2>
          <AssignmentList 
            assignments={weeklyAssignmentsList}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="dancing-small-big-weekly"
            topicName="dancing-small-big"
            topicIndex={1}
          />
        </div>
      </div>
    </div>
  );
};

export default DancingSmallBigAssignments;


import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import AssignmentList from '@/components/AssignmentList';
import { getWeeklyAssignments } from '@/data/assignments/smallAndBig';

const DancingSmallBigAssignments = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  const weeklyAssignments = getWeeklyAssignments();

  const assignments = weeklyAssignments.map((assignment, index) => ({
    id: (index + 1).toString(),
    content: assignment.content,
    task: assignment.task
  }));

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

        <AssignmentList 
          assignments={assignments}
          completedTasks={completedTasks}
          onTaskLevelChange={handleTaskLevelChange}
          keyPrefix="dancing-small-big"
          topicName="dancing-small-big"
          topicIndex={1}
        />
      </div>
    </div>
  );
};

export default DancingSmallBigAssignments;

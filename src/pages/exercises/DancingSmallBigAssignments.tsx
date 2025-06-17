
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import AssignmentList from '@/components/AssignmentList';
import { Assignment } from '@/data/assignments/fastAndSlow';

const DancingSmallBigAssignments = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  const assignments: Assignment[] = [
    {
      id: '1',
      content: 'exercises.dancingSmallBig.assignment1' as any,
      task: t('exercises.dancingSmallBig.assignment1' as any)
    },
    {
      id: '2',
      content: 'exercises.dancingSmallBig.assignment2' as any,
      task: t('exercises.dancingSmallBig.assignment2' as any)
    },
    {
      id: '3',
      content: 'exercises.dancingSmallBig.assignment3' as any,
      task: t('exercises.dancingSmallBig.assignment3' as any)
    },
    {
      id: '4',
      content: 'exercises.dancingSmallBig.assignment4' as any,
      task: t('exercises.dancingSmallBig.assignment4' as any)
    },
    {
      id: '5',
      content: 'exercises.dancingSmallBig.assignment5' as any,
      task: t('exercises.dancingSmallBig.assignment5' as any)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-sandy-beige to-dusty-rose">
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

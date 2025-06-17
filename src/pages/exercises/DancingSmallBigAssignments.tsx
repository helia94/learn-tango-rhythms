
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import AssignmentList from '@/components/AssignmentList';

const DancingSmallBigAssignments = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  const assignments = [
    {
      id: '1',
      content: t('exercises.dancingSmallBig.assignment1'),
      task: t('exercises.dancingSmallBig.assignment1')
    },
    {
      id: '2',
      content: t('exercises.dancingSmallBig.assignment2'),
      task: t('exercises.dancingSmallBig.assignment2')
    },
    {
      id: '3',
      content: t('exercises.dancingSmallBig.assignment3'),
      task: t('exercises.dancingSmallBig.assignment3')
    },
    {
      id: '4',
      content: t('exercises.dancingSmallBig.assignment4'),
      task: t('exercises.dancingSmallBig.assignment4')
    },
    {
      id: '5',
      content: t('exercises.dancingSmallBig.assignment5'),
      task: t('exercises.dancingSmallBig.assignment5')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader 
        title={t('exercises.dancingSmallBig.allAssignments')} 
        backRoute="/exercises/dancing-small-big"
      />
      
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <p className="text-lg text-warm-brown leading-relaxed">
            {t('exercises.dancingSmallBig.assignmentsDescription')}
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

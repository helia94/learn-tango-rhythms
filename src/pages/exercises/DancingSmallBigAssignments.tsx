
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
      content: "exercises.dancingSmallBig.assignment1",
      task: "exercises.dancingSmallBig.assignment1"
    },
    {
      id: '2',
      content: "exercises.dancingSmallBig.assignment2",
      task: "exercises.dancingSmallBig.assignment2"
    },
    {
      id: '3',
      content: "exercises.dancingSmallBig.assignment3",
      task: "exercises.dancingSmallBig.assignment3"
    },
    {
      id: '4',
      content: "exercises.dancingSmallBig.assignment4",
      task: "exercises.dancingSmallBig.assignment4"
    },
    {
      id: '5',
      content: "exercises.dancingSmallBig.assignment5",
      task: "exercises.dancingSmallBig.assignment5"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader 
        title="All Assignments" 
        backRoute="/exercises/dancing-small-big"
      />
      
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <p className="text-lg text-warm-brown leading-relaxed">
            Complete these assignments to master dancing with different step sizes. Work through them at your own pace.
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


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
      content: "Practice walking with your partner at 3 different step sizes: tiny, normal, and large",
      task: "Practice walking with your partner at 3 different step sizes: tiny, normal, and large"
    },
    {
      id: '2',
      content: "Listen to 3 songs and identify staccato vs legato sections",
      task: "Listen to 3 songs and identify staccato vs legato sections"
    },
    {
      id: '3',
      content: "Dance to 3 songs, changing step size based on musical character",
      task: "Dance to 3 songs, changing step size based on musical character"
    },
    {
      id: '4',
      content: "Practice controlling large steps with proper floor contact and posture",
      task: "Practice controlling large steps with proper floor contact and posture"
    },
    {
      id: '5',
      content: "Work on follower patience and connection during size transitions",
      task: "Work on follower patience and connection during size transitions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-sandy-beige to-dusty-rose">
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

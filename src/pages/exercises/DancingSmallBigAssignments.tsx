
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import AssignmentList from '@/components/AssignmentList';

const DancingSmallBigAssignments = () => {
  const { t } = useTranslation();

  const assignments = [
    {
      id: 1,
      title: t('exercises.dancingSmallBig.assignment1'),
      description: t('exercises.dancingSmallBig.assignment1'),
      completed: false
    },
    {
      id: 2,
      title: t('exercises.dancingSmallBig.assignment2'),
      description: t('exercises.dancingSmallBig.assignment2'),
      completed: false
    },
    {
      id: 3,
      title: t('exercises.dancingSmallBig.assignment3'),
      description: t('exercises.dancingSmallBig.assignment3'),
      completed: false
    },
    {
      id: 4,
      title: t('exercises.dancingSmallBig.assignment4'),
      description: t('exercises.dancingSmallBig.assignment4'),
      completed: false
    },
    {
      id: 5,
      title: t('exercises.dancingSmallBig.assignment5'),
      description: t('exercises.dancingSmallBig.assignment5'),
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-sandy-beige to-dusty-rose">
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

        <AssignmentList assignments={assignments} />
      </div>
    </div>
  );
};

export default DancingSmallBigAssignments;

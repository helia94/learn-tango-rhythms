
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import DayItem from '@/components/daily/DayItem';
import { getDayStatus } from '@/components/daily/DayStatus';

const FastAndSlowDaily1to7 = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  // Simulate user progress (0-7 days unlocked)
  const daysUnlocked = 7; // Updated to show Day 7 is now unlocked

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
        <h2 className="text-3xl font-display text-gray-800">{t('daily.title')}</h2>
        <p className="text-gray-600 mt-2">
          {t('daily.subtitle')} ({daysUnlocked}/7 days unlocked)
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map(dayNumber => {
          const status = getDayStatus(dayNumber, daysUnlocked);
          const isCompleted = completedTasks[`day-${dayNumber}-task`] > 0;
          
          return (
            <DayItem
              key={dayNumber}
              dayNumber={dayNumber}
              status={status}
              isCompleted={isCompleted}
              completedTasks={completedTasks}
              onTaskLevelChange={handleTaskLevelChange}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default FastAndSlowDaily1to7;

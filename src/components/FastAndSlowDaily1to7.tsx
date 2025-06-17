
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import DayItem from '@/components/daily/DayItem';
import { getDayStatus } from '@/components/daily/DayStatus';

const FastAndSlowDaily1to7 = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});
  
  const { activatedDays, activateDay, isLoading } = useDailyTopicActivation('dancing-fast-slow', 0);

  // Calculate days unlocked based on activated days
  const daysUnlocked = activatedDays.length > 0 ? Math.max(...activatedDays) : 0;

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  const handleDayActivation = async (dayNumber: number) => {
    if (!user) return;
    
    try {
      await activateDay(dayNumber);
    } catch (error) {
      console.error('Failed to activate day:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
          <h2 className="text-3xl font-display text-gray-800">{t('daily.title')}</h2>
          <p className="text-gray-600 mt-2">{t('common.loading')}...</p>
        </div>
      </div>
    );
  }

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
              onDayActivation={user ? () => handleDayActivation(dayNumber) : undefined}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default FastAndSlowDaily1to7;

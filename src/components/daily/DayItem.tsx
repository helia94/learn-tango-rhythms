// DayItem.tsx  – fixed version
import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import DayContent from './DayContent';
import { DayStatus } from './DayStatus';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import { useTopicActivation } from '@/hooks/useTopicActivation';

interface DayItemProps {
  dayNumber: number;
  status: DayStatus;
  isCompleted: boolean;
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  onDayActivation?: () => void;
  topicName?: string;
  topicIndex?: number;
}

const DayItem: React.FC<DayItemProps> = ({
  dayNumber,
  status,
  isCompleted,
  completedTasks,
  onTaskLevelChange,
  onDayActivation,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();
  const [timeUntilUnlock, setTimeUntilUnlock] = useState<string | null>(null);
  const [canActivateNow, setCanActivateNow] = useState(false);

  // Get topic activation status to trigger refresh when topic is activated
  const { isTopicActive } = useTopicActivation();
  const [topicActiveState, setTopicActiveState] = useState<boolean | null>(null);

  // ← added isLoading
  const { getTimeUntilNextActivation, canActivateDay, isLoading } = useDailyTopicActivation(
    topicName,
    topicIndex,
    7 // totalDays
  );

  // Check topic activation status and update local state
  useEffect(() => {
    const checkTopicStatus = async () => {
      const isActive = await isTopicActive(topicName, topicIndex);
      setTopicActiveState(isActive);
    };
    
    if (!isLoading) {
      checkTopicStatus();
      
      // If topic is not active, poll every 2 seconds to catch activation
      if (topicActiveState === false) {
        const interval = setInterval(checkTopicStatus, 2000);
        return () => clearInterval(interval);
      }
    }
  }, [isTopicActive, topicName, topicIndex, isLoading, topicActiveState]);

  useEffect(() => {
    // wait until hook finishes loading
    if (status !== 'tomorrow' || isLoading) return;

    let isMounted = true;

    (async () => {
      const canActivate = await canActivateDay(dayNumber);
      if (!isMounted) return;

      if (canActivate) {
        setCanActivateNow(true);
        setTimeUntilUnlock(null);
        return;
      }

      setCanActivateNow(false);

      const timeMs = await getTimeUntilNextActivation();
      if (!isMounted) return;

      if (timeMs == null || timeMs < 0) {
        setTimeUntilUnlock(t('daily.unlockError'));
      } else {
        const hours = Math.floor(timeMs / 3_600_000);
        const minutes = Math.floor((timeMs % 3_600_000) / 60_000);
        
        // If less than 1 hour remaining, show "available tomorrow" instead
        if (hours === 0 && minutes < 60) {
          setTimeUntilUnlock(null);
        } else {
          setTimeUntilUnlock(
            hours ? `unlock in ${hours}h ${minutes}m` : `unlock in ${minutes}m`
          );
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [status, dayNumber, topicName, topicIndex, isLoading, topicActiveState]); // ← include topicActiveState to refresh when topic is activated

  // For locked days, not expandable
  if (status === 'locked') {
    return (
      <div className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <span className="text-xl font-display text-gray-700">Day {dayNumber}</span>
            </div>
            <span className="text-sm text-gray-400 font-medium ml-auto">
              {t('daily.locked')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // For tomorrow days, not expandable
  if (status === 'tomorrow') {
    return (
      <div className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-golden-yellow" />
              <span className="text-xl font-display text-gray-700">Day {dayNumber}</span>
            </div>

            {canActivateNow && onDayActivation && (
              <Button
                onClick={onDayActivation}
                size="sm"
                variant="outline"
                className="ml-auto bg-golden-yellow/20 hover:bg-golden-yellow/30 border-golden-yellow/30 text-golden-yellow"
              >
                <Play className="w-4 h-4 mr-1" />
                {t('daily.unlockDay')}
              </Button>
            )}

            {!canActivateNow && timeUntilUnlock && topicActiveState && (
              <span className="text-sm text-golden-yellow font-medium ml-auto">
                {timeUntilUnlock}
              </span>
            )}

            {!canActivateNow && !timeUntilUnlock && topicActiveState && (
              <span className="text-sm text-golden-yellow font-medium ml-auto">
                {t('daily.availableTomorrow')}
              </span>
            )}

            {topicActiveState === false && (
              <span className="text-sm text-gray-500 font-medium ml-auto">
                {t('daily.activateTopicFirst')}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Unlocked days are expandable
  return (
    <AccordionItem
      value={`day-${dayNumber}`}
      className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-sage-green" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
            )}
            <span className="text-xl font-display text-gray-700">Day {dayNumber}</span>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-6 pb-6">
        <DayContent
          dayNumber={dayNumber}
          completedTasks={completedTasks}
          onTaskLevelChange={onTaskLevelChange}
          topicName={topicName}
          topicIndex={topicIndex}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default DayItem;

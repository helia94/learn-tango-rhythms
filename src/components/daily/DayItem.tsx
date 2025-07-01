
// DayItem.tsx  – fixed version with detailed logging
import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import DayContent from './DayContent';
import { DayStatus } from './DayStatus';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';

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

  console.log(`[DayItem] Component rendered - Day ${dayNumber}, Status: ${status}, Topic: ${topicName}/${topicIndex}`);

  // ← added isLoading
  const { getTimeUntilNextActivation, canActivateDay, isLoading } = useDailyTopicActivation(
    topicName,
    topicIndex,
    7 // totalDays
  );

  console.log(`[DayItem] Hook data - Day ${dayNumber}, isLoading: ${isLoading}`);

  useEffect(() => {
    console.log(`[DayItem] useEffect triggered - Day ${dayNumber}, Status: ${status}, isLoading: ${isLoading}`);
    
    // wait until hook finishes loading
    if (status !== 'tomorrow' || isLoading) {
      console.log(`[DayItem] Skipping effect - Day ${dayNumber}, Status: ${status}, isLoading: ${isLoading}`);
      return;
    }

    let isMounted = true;
    console.log(`[DayItem] Starting async activation check for Day ${dayNumber}`);

    (async () => {
      try {
        console.log(`[DayItem] Checking if Day ${dayNumber} can be activated`);
        const canActivate = await canActivateDay(dayNumber);
        if (!isMounted) {
          console.log(`[DayItem] Component unmounted during canActivateDay check for Day ${dayNumber}`);
          return;
        }

        console.log(`[DayItem] Day ${dayNumber} can activate: ${canActivate}`);

        if (canActivate) {
          console.log(`[DayItem] Day ${dayNumber} can be activated now, showing activate button`);
          setCanActivateNow(true);
          setTimeUntilUnlock(null);
          return;
        }

        console.log(`[DayItem] Day ${dayNumber} cannot be activated, checking wait time`);
        setCanActivateNow(false);

        const timeMs = await getTimeUntilNextActivation();
        if (!isMounted) {
          console.log(`[DayItem] Component unmounted during time check for Day ${dayNumber}`);
          return;
        }

        console.log(`[DayItem] Time until next activation for Day ${dayNumber}: ${timeMs}ms`);

        if (timeMs == null || timeMs < 0) {
          console.log(`[DayItem] Invalid wait time for Day ${dayNumber}, showing unavailable message`);
          setTimeUntilUnlock('unlock time unavailable');
        } else {
          const hours = Math.floor(timeMs / 3_600_000);
          const minutes = Math.floor((timeMs % 3_600_000) / 60_000);
          const timeString = hours ? `unlock in ${hours}h ${minutes}m` : `unlock in ${minutes}m`;
          console.log(`[DayItem] Setting unlock time for Day ${dayNumber}: ${timeString}`);
          setTimeUntilUnlock(timeString);
        }
      } catch (error) {
        console.error(`[DayItem] Error in activation check for Day ${dayNumber}:`, error);
        if (isMounted) {
          setCanActivateNow(false);
          setTimeUntilUnlock('unlock time unavailable');
        }
      }
    })();

    return () => {
      console.log(`[DayItem] Cleanup for Day ${dayNumber}`);
      isMounted = false;
    };
  }, [status, dayNumber, topicName, topicIndex, isLoading]); // ← include isLoading

  // For locked days, not expandable
  if (status === 'locked') {
    console.log(`[DayItem] Rendering locked day ${dayNumber}`);
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
    console.log(`[DayItem] Rendering tomorrow day ${dayNumber} - canActivateNow: ${canActivateNow}, timeUntilUnlock: ${timeUntilUnlock}`);
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
                onClick={() => {
                  console.log(`[DayItem] Activate button clicked for Day ${dayNumber}`);
                  onDayActivation();
                }}
                size="sm"
                variant="outline"
                className="ml-auto bg-golden-yellow/20 hover:bg-golden-yellow/30 border-golden-yellow/30 text-golden-yellow"
              >
                <Play className="w-4 h-4 mr-1" />
                {t('daily.unlockDay')}
              </Button>
            )}

            {!canActivateNow && timeUntilUnlock && (
              <span className="text-sm text-golden-yellow font-medium ml-auto">
                {timeUntilUnlock}
              </span>
            )}

            {!canActivateNow && !timeUntilUnlock && (
              <span className="text-sm text-golden-yellow font-medium ml-auto">
                {t('daily.availableTomorrow')}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Unlocked days are expandable
  console.log(`[DayItem] Rendering unlocked day ${dayNumber} - isCompleted: ${isCompleted}`);
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

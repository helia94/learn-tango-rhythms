
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
  
  const { getTimeUntilNextActivation, canActivateDay } = useDailyTopicActivation(
    topicName, 
    topicIndex, 
    7 // totalDays - this could be made dynamic if needed
  );

  // Fetch unlock time only once when component mounts and status is 'tomorrow'
  useEffect(() => {
    console.log(`[DayItem ${dayNumber}] useEffect triggered`, {
      status,
      topicName,
      topicIndex,
      dayNumber
    });

    if (status !== 'tomorrow') {
      console.log(`[DayItem ${dayNumber}] Status is not 'tomorrow', skipping unlock info fetch`);
      return;
    }

    let isMounted = true;
    
    const fetchUnlockInfo = async () => {
      console.log(`[DayItem ${dayNumber}] Starting fetchUnlockInfo`);
      
      try {
        // Check if day can be activated now
        console.log(`[DayItem ${dayNumber}] Checking if day can be activated...`);
        const canActivate = await canActivateDay(dayNumber);
        console.log(`[DayItem ${dayNumber}] canActivateDay result:`, canActivate);
        
        if (!isMounted) {
          console.log(`[DayItem ${dayNumber}] Component unmounted, returning early`);
          return;
        }
        
        if (canActivate) {
          console.log(`[DayItem ${dayNumber}] Day can be activated - setting canActivateNow to true`);
          setCanActivateNow(true);
          setTimeUntilUnlock(null);
          return;
        }

        console.log(`[DayItem ${dayNumber}] Day cannot be activated, checking time until next activation...`);
        // Get time until next activation
        const timeMs = await getTimeUntilNextActivation();
        console.log(`[DayItem ${dayNumber}] getTimeUntilNextActivation result:`, timeMs);
        
        if (!isMounted) {
          console.log(`[DayItem ${dayNumber}] Component unmounted after getTimeUntilNextActivation, returning early`);
          return;
        }
        
        if (timeMs === null || timeMs <= 0) {
          console.log(`[DayItem ${dayNumber}] Time is null or <= 0, setting canActivateNow to true`);
          setCanActivateNow(true);
          setTimeUntilUnlock(null);
        } else {
          console.log(`[DayItem ${dayNumber}] Time remaining: ${timeMs}ms, setting canActivateNow to false`);
          setCanActivateNow(false);
          
          // Convert milliseconds to hours and minutes
          const hours = Math.floor(timeMs / (1000 * 60 * 60));
          const minutes = Math.floor((timeMs % (1000 * 60 * 60)) / (1000 * 60));
          
          if (hours > 0) {
            setTimeUntilUnlock(`unlock in ${hours}h ${minutes}m`);
          } else if (minutes > 0) {
            setTimeUntilUnlock(`unlock in ${minutes}m`);
          } else {
            setTimeUntilUnlock('unlock soon');
          }
          
          console.log(`[DayItem ${dayNumber}] Set timeUntilUnlock:`, `unlock in ${hours}h ${minutes}m`);
        }
      } catch (error) {
        console.error(`[DayItem ${dayNumber}] Error fetching unlock info:`, error);
        if (isMounted) {
          setTimeUntilUnlock('unlock time unavailable');
          setCanActivateNow(false);
          console.log(`[DayItem ${dayNumber}] Error occurred - set canActivateNow to false`);
        }
      }
    };

    fetchUnlockInfo();
    
    return () => {
      console.log(`[DayItem ${dayNumber}] Component cleanup`);
      isMounted = false;
    };
  }, [status, dayNumber, topicName, topicIndex, canActivateDay, getTimeUntilNextActivation]);

  // Additional logging for state changes
  useEffect(() => {
    console.log(`[DayItem ${dayNumber}] State update:`, {
      canActivateNow,
      timeUntilUnlock,
      status,
      hasOnDayActivation: !!onDayActivation
    });
  }, [canActivateNow, timeUntilUnlock, status, onDayActivation, dayNumber]);

  // For locked days, don't make them expandable
  if (status === 'locked') {
    console.log(`[DayItem ${dayNumber}] Rendering locked day`);
    return (
      <div className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <span className="text-xl font-display text-gray-700">
                Day {dayNumber}
              </span>
            </div>
            <span className="text-sm text-gray-400 font-medium ml-auto">
              {t('daily.locked')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // For 'tomorrow' days (ready to activate), don't make them expandable either
  if (status === 'tomorrow') {
    console.log(`[DayItem ${dayNumber}] Rendering tomorrow day`, {
      canActivateNow,
      hasOnDayActivation: !!onDayActivation,
      timeUntilUnlock
    });
    
    return (
      <div className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-golden-yellow" />
              <span className="text-xl font-display text-gray-700">
                Day {dayNumber}
              </span>
            </div>
            
            {canActivateNow && onDayActivation && (
              <>
                {console.log(`[DayItem ${dayNumber}] Rendering unlock button - canActivateNow: ${canActivateNow}, onDayActivation: ${!!onDayActivation}`)}
                <Button
                  onClick={() => {
                    console.log(`[DayItem ${dayNumber}] Unlock button clicked`);
                    onDayActivation();
                  }}
                  size="sm"
                  variant="outline"
                  className="ml-auto bg-golden-yellow/20 hover:bg-golden-yellow/30 border-golden-yellow/30 text-golden-yellow"
                >
                  <Play className="w-4 h-4 mr-1" />
                  {t('daily.unlockDay')}
                </Button>
              </>
            )}
            
            {!canActivateNow && timeUntilUnlock && (
              <>
                {console.log(`[DayItem ${dayNumber}] Rendering time until unlock: ${timeUntilUnlock}`)}
                <span className="text-sm text-golden-yellow font-medium ml-auto">
                  {timeUntilUnlock}
                </span>
              </>
            )}
            
            {!canActivateNow && !timeUntilUnlock && (
              <>
                {console.log(`[DayItem ${dayNumber}] Rendering 'available tomorrow' message`)}
                <span className="text-sm text-golden-yellow font-medium ml-auto">
                  {t('daily.availableTomorrow')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Only unlocked days are expandable
  console.log(`[DayItem ${dayNumber}] Rendering unlocked/expandable day`);
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
            <span className="text-xl font-display text-gray-700">
              Day {dayNumber}
            </span>
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


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
  const [isCheckingActivation, setIsCheckingActivation] = useState(false);
  
  const { getTimeUntilNextActivation, canActivateDay } = useDailyTopicActivation(
    topicName, 
    topicIndex, 
    7 // totalDays - this could be made dynamic if needed
  );

  // Check activation status only for 'tomorrow' status days
  useEffect(() => {
    if (status !== 'tomorrow') {
      setCanActivateNow(false);
      setTimeUntilUnlock(null);
      return;
    }

    let isMounted = true;
    
    const checkActivationStatus = async () => {
      setIsCheckingActivation(true);
      
      try {
        // First check if day can be activated - this is our primary check
        const canActivate = await canActivateDay(dayNumber);
        if (!isMounted) return;
        
        if (canActivate) {
          // Day can be activated immediately
          setCanActivateNow(true);
          setTimeUntilUnlock(null);
        } else {
          // Day cannot be activated yet, get timing info
          setCanActivateNow(false);
          
          const timeMs = await getTimeUntilNextActivation();
          if (!isMounted) return;
          
          if (timeMs === null || timeMs <= 0) {
            setTimeUntilUnlock('available soon');
          } else {
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
          }
        }
      } catch (error) {
        console.error('Error checking activation status:', error);
        if (isMounted) {
          setCanActivateNow(false);
          setTimeUntilUnlock('check back later');
        }
      } finally {
        if (isMounted) {
          setIsCheckingActivation(false);
        }
      }
    };

    checkActivationStatus();
    
    return () => {
      isMounted = false;
    };
  }, [status, dayNumber, topicName, topicIndex, canActivateDay, getTimeUntilNextActivation]);

  // For locked days, don't make them expandable
  if (status === 'locked') {
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
            
            {isCheckingActivation && (
              <span className="text-sm text-golden-yellow font-medium ml-auto">
                checking...
              </span>
            )}
            
            {!isCheckingActivation && canActivateNow && onDayActivation && (
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
            
            {!isCheckingActivation && !canActivateNow && timeUntilUnlock && (
              <span className="text-sm text-golden-yellow font-medium ml-auto">
                {timeUntilUnlock}
              </span>
            )}
            
            {!isCheckingActivation && !canActivateNow && !timeUntilUnlock && (
              <span className="text-sm text-golden-yellow font-medium ml-auto">
                {t('daily.availableTomorrow')}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Only unlocked days are expandable
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

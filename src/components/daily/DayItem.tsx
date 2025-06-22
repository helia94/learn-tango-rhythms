
import React from 'react';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import DayContent from './DayContent';
import { DayStatus } from './DayStatus';

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

  console.log(`DayItem - Day ${dayNumber} received props:`, {
    topicName,
    topicIndex,
    status
  });

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

  return (
    <AccordionItem 
      value={`day-${dayNumber}`} 
      className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-3">
            {status === 'tomorrow' ? (
              <Lock className="w-5 h-5 text-golden-yellow" />
            ) : isCompleted ? (
              <CheckCircle className="w-5 h-5 text-sage-green" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
            )}
            <span className="text-xl font-display text-gray-700">
              Day {dayNumber}
            </span>
          </div>
          
          {status === 'tomorrow' && onDayActivation && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDayActivation();
              }}
              size="sm"
              variant="outline"
              className="ml-auto mr-4 bg-golden-yellow/20 hover:bg-golden-yellow/30 border-golden-yellow/30 text-golden-yellow"
            >
              <Play className="w-4 h-4 mr-1" />
              {t('daily.unlockDay')}
            </Button>
          )}
          
          {status === 'tomorrow' && !onDayActivation && (
            <span className="text-sm text-golden-yellow font-medium ml-auto mr-4">
              {t('daily.availableTomorrow')}
            </span>
          )}
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

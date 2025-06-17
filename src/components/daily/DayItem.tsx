
import React from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import DayContent from './DayContent';
import { DayStatus } from './DayStatus';

interface DayItemProps {
  dayNumber: number;
  status: DayStatus;
  isCompleted: boolean;
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DayItem: React.FC<DayItemProps> = ({
  dayNumber,
  status,
  isCompleted,
  completedTasks,
  onTaskLevelChange
}) => {
  const { t } = useTranslation();

  return (
    <AccordionItem 
      value={`day-${dayNumber}`} 
      className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-3">
            {status === 'locked' || status === 'tomorrow' ? (
              <Lock className={`w-5 h-5 ${status === 'tomorrow' ? 'text-golden-yellow' : 'text-gray-400'}`} />
            ) : isCompleted ? (
              <CheckCircle className="w-5 h-5 text-sage-green" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
            )}
            <span className="text-xl font-display text-gray-700">
              Day {dayNumber}
            </span>
          </div>
          
          {status === 'tomorrow' && (
            <span className="text-sm text-golden-yellow font-medium ml-auto mr-4">
              {t('daily.availableTomorrow')}
            </span>
          )}
          
          {status === 'locked' && (
            <span className="text-sm text-gray-400 font-medium ml-auto mr-4">
              {t('daily.locked')}
            </span>
          )}
        </div>
      </AccordionTrigger>
      
      <AccordionContent className="px-6 pb-6">
        <DayContent
          dayNumber={dayNumber}
          status={status}
          completedTasks={completedTasks}
          onTaskLevelChange={onTaskLevelChange}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default DayItem;

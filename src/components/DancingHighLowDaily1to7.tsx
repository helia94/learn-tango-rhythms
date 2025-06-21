
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import { Calendar, Clock, CheckCircle, Lock } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DayContent from '@/components/daily/DayContent';
import { DayStatus } from '@/components/daily/DayStatus';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';

interface DancingHighLowDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingHighLowDaily1to7: React.FC<DancingHighLowDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange,
}) => {
  const { t } = useTranslation();
  const topicKey = 'dancing-high-low';
  const topicIndex = 2;
  
  const {
    activatedDays,
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
  } = useDailyTopicActivation(topicKey, topicIndex);

  const getDayStatus = (dayNumber: number): DayStatus => {
    const activatedDaysList = whichDailiesWereActivated();
    const nextDay = whichDailyIsNextOnActivationOrder();
    
    if (activatedDaysList.includes(dayNumber)) {
      return 'unlocked';
    } else if (nextDay === dayNumber) {
      return 'tomorrow';
    } else {
      return 'locked';
    }
  };

  const getStatusIcon = (status: DayStatus) => {
    switch (status) {
      case 'unlocked':
        return <CheckCircle className="w-5 h-5 text-sage-green" />;
      case 'tomorrow':
        return <Clock className="w-5 h-5 text-golden-yellow" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: DayStatus) => {
    switch (status) {
      case 'unlocked':
        return 'border-sage-green/30 bg-sage-green/5';
      case 'tomorrow':
        return 'border-golden-yellow/30 bg-golden-yellow/5';
      case 'locked':
        return 'border-gray-300 bg-gray-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  // Calculate data for header
  const activatedDaysList = whichDailiesWereActivated();
  const daysUnlocked = Math.max(...activatedDaysList, 0);
  const nextDayToActivate = whichDailyIsNextOnActivationOrder();
  const totalDays = 5;

  return (
    <div className="space-y-6">
      <DailyAssignmentsHeader
        daysUnlocked={daysUnlocked}
        totalDays={totalDays}
        nextDayToActivate={nextDayToActivate}
      />

      <Accordion type="single" collapsible className="space-y-4">
        {[1, 2, 3, 4, 5].map((dayNumber) => {
          const status = getDayStatus(dayNumber);
          const statusColor = getStatusColor(status);
          
          return (
            <AccordionItem
              key={dayNumber}
              value={`day-${dayNumber}`}
              className={`border-2 rounded-2xl overflow-hidden ${statusColor} transition-all duration-300`}
            >
              <AccordionTrigger 
                className="px-6 py-4 hover:no-underline group"
                disabled={status === 'locked'}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status)}
                    <span className="text-xl font-display text-gray-800">
                      Day {dayNumber}
                    </span>
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-600 font-medium">
                      {status === 'unlocked' && 'Available Now'}
                      {status === 'tomorrow' && 'Available Tomorrow'}
                      {status === 'locked' && 'Locked'}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <DayContent
                  dayNumber={dayNumber}
                  status={status}
                  completedTasks={completedTasks}
                  onTaskLevelChange={onTaskLevelChange}
                  topicName={topicKey}
                  topicIndex={topicIndex}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default DancingHighLowDaily1to7;

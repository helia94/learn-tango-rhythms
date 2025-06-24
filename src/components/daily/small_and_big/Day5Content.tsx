
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';

interface Day5ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day5Content: React.FC<Day5ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingSmallBig.daily.day5.content' as any)}
      </p>
      
      <div className="bg-warm-brown/10 backdrop-blur-sm rounded-xl border border-cream/20 p-6 my-6">
        <h4 className="text-lg font-semibold text-warm-brown mb-4">
          {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.title' as any)}
        </h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-sandy-beige/50 p-4 rounded-lg">
            <div className="font-medium text-warm-brown">
              {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.fastSmall.title' as any)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.fastSmall.description' as any)}
            </div>
          </div>
          <div className="bg-sandy-beige/50 p-4 rounded-lg">
            <div className="font-medium text-warm-brown">
              {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.fastBig.title' as any)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.fastBig.description' as any)}
            </div>
          </div>
          <div className="bg-sandy-beige/50 p-4 rounded-lg">
            <div className="font-medium text-warm-brown">
              {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.slowSmall.title' as any)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.slowSmall.description' as any)}
            </div>
          </div>
          <div className="bg-sandy-beige/50 p-4 rounded-lg">
            <div className="font-medium text-warm-brown">
              {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.slowBig.title' as any)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {t('exercises.dancingSmallBig.daily.day5.speedSizeMatrix.slowBig.description' as any)}
            </div>
          </div>
        </div>
      </div>
      
      <Assignment
        assignment={{ 
          content: 'exercises.dancingSmallBig.daily.day5.task' as any
        }}
        taskId="day-5-task"
        level={completedTasks['day-5-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day5Content;

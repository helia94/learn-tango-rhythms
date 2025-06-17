
import React, { useState } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import AssignmentList from '@/components/AssignmentList';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments';
import { getDayStatus } from '@/components/daily/DayStatus';
import { TranslationKey } from '@/data/translations';

const DancingFastSlowAssignments = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  // Simulate user progress (0-7 days unlocked)
  const daysUnlocked = 7;

  const weeklyAssignments = getWeeklyAssignments();
  const walkingPracticeAssignment = getAssignment('walking-practice');

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  // Daily assignments data with proper typing
  const dailyAssignments = [
    { key: 'day1', translationKey: 'daily.day1.content' as TranslationKey, taskKey: 'daily.day1.task' as TranslationKey },
    { key: 'day2', translationKey: 'daily.day2.content' as TranslationKey, taskKey: 'daily.day2.task' as TranslationKey },
    { key: 'day3', translationKey: 'daily.day3.content' as TranslationKey, taskKey: 'daily.day3.task' as TranslationKey },
    { key: 'day4', translationKey: 'daily.day4.content' as TranslationKey, taskKey: 'daily.day4.task' as TranslationKey },
    { key: 'day5', translationKey: 'daily.day5.content' as TranslationKey, taskKey: 'daily.day5.task' as TranslationKey },
    { key: 'day6', translationKey: 'daily.day6.content' as TranslationKey, taskKey: 'daily.day6.task' as TranslationKey },
    { key: 'day7', translationKey: 'daily.day7.content' as TranslationKey, taskKey: 'daily.day7.task' as TranslationKey }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader 
        title={t('exercises.dancingFastSlow.allAssignments')} 
        backRoute="/exercises/dancing-fast-slow"
      />

      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Introduction */}
        <StorySection>
          <TextContent variant="lead" align="center">
            {t('exercises.dancingFastSlow.assignmentsDescription')}
          </TextContent>
        </StorySection>

        {/* Weekly Assignments */}
        <StorySection title={t('exercises.dancingFastSlow.weeklyAssignments')} variant="assignment">
          <AssignmentList
            assignments={weeklyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="weekly-assignment"
          />

          {walkingPracticeAssignment && (
            <div className="mt-6">
              <Assignment
                assignment={walkingPracticeAssignment}
                taskId="walking-practice"
                level={completedTasks['walking-practice'] || 0}
                onLevelChange={handleTaskLevelChange}
                variant="golden"
              />
            </div>
          )}
        </StorySection>

        {/* Daily Assignments */}
        <StorySection title={t('daily.title')} variant="practice">
          <TextContent variant="body" align="center" className="mb-8">
            {t('daily.subtitle')} ({daysUnlocked}/7 days unlocked)
          </TextContent>

          <div className="space-y-4">
            {dailyAssignments.map((day, index) => {
              const dayNumber = index + 1;
              const status = getDayStatus(dayNumber, daysUnlocked);
              const taskId = `${day.key}-task`;
              const isCompleted = completedTasks[taskId] > 0;
              const isLocked = status === 'locked' || status === 'tomorrow';

              return (
                <div 
                  key={day.key}
                  className={`bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 p-6 ${
                    isLocked ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {isLocked ? (
                        <Lock className={`w-5 h-5 ${status === 'tomorrow' ? 'text-golden-yellow' : 'text-gray-400'} flex-shrink-0`} />
                      ) : isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-sage-green flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0" />
                      )}
                      
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-display text-gray-700 mb-2">
                          Day {dayNumber}
                          {status === 'tomorrow' && (
                            <span className="text-sm text-golden-yellow font-medium ml-2">
                              {t('daily.availableTomorrow')}
                            </span>
                          )}
                          {status === 'locked' && (
                            <span className="text-sm text-gray-400 font-medium ml-2">
                              {t('daily.locked')}
                            </span>
                          )}
                        </h3>
                        
                        <TextContent variant="body" className="mb-4">
                          {t(day.translationKey)}
                        </TextContent>

                        {!isLocked && (
                          <Assignment
                            assignment={{ 
                              content: day.translationKey, 
                              task: day.taskKey 
                            }}
                            taskId={taskId}
                            level={completedTasks[taskId] || 0}
                            onLevelChange={handleTaskLevelChange}
                            variant="sage"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </StorySection>
      </div>
    </div>
  );
};

export default DancingFastSlowAssignments;

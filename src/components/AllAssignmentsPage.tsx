
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import AssignmentList from '@/components/AssignmentList';
import TextContent from '@/components/ui/TextContent';
import { getDayStatus } from '@/components/daily/DayStatus';
import { Assignment } from '@/data/assignments/fastAndSlow';
import { useAssignmentProgressLoader } from '@/hooks/useAssignmentProgressLoader';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';

interface AllAssignmentsPageProps {
  /** Title translation key for the page header */
  titleKey: string;
  /** Description translation key */
  descriptionKey: string;
  /** Route to navigate back to */
  backRoute: string;
  /** Weekly assignments array */
  weeklyAssignments: Assignment[];
  /** Function to get assignment by key */
  getAssignment: (key: string) => Assignment | undefined;
  /** Topic name for reporting */
  topicName: string;
  /** Topic index for reporting */
  topicIndex: number;
  /** Total number of days for this topic */
  totalDays?: number;
}

const AllAssignmentsPage: React.FC<AllAssignmentsPageProps> = ({
  titleKey,
  descriptionKey,
  backRoute,
  weeklyAssignments,
  getAssignment,
  topicName,
  topicIndex,
  totalDays = 7
}) => {
  const { t, currentLanguage } = useTranslation();
  const { 
    completedTasks, 
    handleTaskLevelChange, 
    isLoading: progressLoading 
  } = useAssignmentProgressLoader(topicName, topicIndex);

  // Get activated days from the daily topic activation hook
  const { whichDailiesWereActivated, isLoading: dailyLoading } = useDailyTopicActivation(topicName, topicIndex, totalDays);
  
  // State for async activated days
  const [activatedDays, setActivatedDays] = useState<number[]>([]);

  // Fetch activated days asynchronously
  useEffect(() => {
    const fetchActivatedDays = async () => {
      try {
        const result = await whichDailiesWereActivated();
        setActivatedDays(result);
      } catch (error) {
        console.error('Error fetching activated days:', error);
        setActivatedDays([]);
      }
    };

    fetchActivatedDays();
  }, [whichDailiesWereActivated]);

  // Create daily assignments only for unlocked days
  const dailyAssignments: Assignment[] = [];
  for (let dayNumber = 1; dayNumber <= totalDays; dayNumber++) {
    // Only include assignments from activated/unlocked days
    if (activatedDays.includes(dayNumber)) {
      const assignment = getAssignment(`day${dayNumber}`);
      if (assignment) {
        dailyAssignments.push(assignment);
      }
    }
  }

  // Create all assignments in one array - WEEKLY FIRST, then DAILY (filtered)
  const allAssignments: Assignment[] = [
    // Weekly assignments first (always shown)
    ...weeklyAssignments,
    // Daily assignments second (only from unlocked days)
    ...dailyAssignments
  ];

  // Create assignment metadata for locked status - only for shown assignments
  const assignmentMetadata = [
    // Weekly assignments metadata (always unlocked)
    ...weeklyAssignments.map((_, index) => ({ 
      isLocked: false, 
      dayNumber: null,
      taskIdPrefix: `assignment-${index}`
    })),
    // Daily assignments metadata (only for unlocked days)
    ...dailyAssignments.map((_, filteredIndex) => {
      // Find the actual day number for this filtered assignment
      const actualDayNumber = activatedDays[filteredIndex];
      return {
        isLocked: false, // These are already filtered to be unlocked
        dayNumber: null,
        taskIdPrefix: `day-${actualDayNumber}-task`
      };
    })
  ];

  console.log('🔧 AllAssignmentsPage - Filtered assignments:', {
    activatedDays,
    dailyAssignmentsCount: dailyAssignments.length,
    totalAssignments: allAssignments.length
  });

  if (progressLoading || dailyLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
        <PageHeader 
          title={t(titleKey as any)} 
          backRoute={backRoute}
        />
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="text-center">
            <p className="text-gray-600 mt-8">{t('common.loading')}...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={currentLanguage} className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader 
        title={t(titleKey as any)} 
        backRoute={backRoute}
      />

      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Introduction */}
        <StorySection>
          <TextContent variant="lead" align="center">
            {t(descriptionKey as any)}
          </TextContent>
        </StorySection>

        {/* All Assignments in One Simple List */}
        <StorySection title={t(titleKey as any)} variant="assignment">
          <AssignmentList
            assignments={allAssignments}
            assignmentMetadata={assignmentMetadata}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="assignment"
            topicName={topicName}
            topicIndex={topicIndex}
          />
        </StorySection>
      </div>
    </div>
  );
};

export default AllAssignmentsPage;

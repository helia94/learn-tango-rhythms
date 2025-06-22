
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import AssignmentList from '@/components/AssignmentList';
import TextContent from '@/components/ui/TextContent';
import { getDayStatus } from '@/components/daily/DayStatus';
import { Assignment } from '@/data/assignments/fastAndSlow';
import { useAssignmentProgressLoader } from '@/hooks/useAssignmentProgressLoader';

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

  // Simulate user progress (unlock all days for assignments page)
  const daysUnlocked = totalDays;

  // Create daily assignments based on actual totalDays
  const dailyAssignments: Assignment[] = [];
  for (let dayNumber = 1; dayNumber <= totalDays; dayNumber++) {
    const assignment = getAssignment(`day${dayNumber}`);
    if (assignment) {
      dailyAssignments.push(assignment);
    }
  }

  // Create all assignments in one array - WEEKLY FIRST, then DAILY
  const allAssignments: Assignment[] = [
    // Weekly assignments first (same order as main page)
    ...weeklyAssignments,
    // Daily assignments second (only existing ones)
    ...dailyAssignments
  ];

  // Create assignment metadata for locked status - FIXED: Use consistent task IDs
  const assignmentMetadata = [
    // Weekly assignments metadata (match database pattern: assignment-0, assignment-1, etc.)
    ...weeklyAssignments.map((_, index) => ({ 
      isLocked: false, 
      dayNumber: null,
      taskIdPrefix: `assignment-${index}` // Changed from weekly-assignment-{index+1}
    })),
    // Daily assignments metadata (match database pattern: day-X-task)
    ...dailyAssignments.map((_, index) => {
      const dayNumber = index + 1;
      const status = getDayStatus(dayNumber, daysUnlocked);
      return {
        isLocked: status === 'locked' || status === 'tomorrow',
        dayNumber: null, // No day number display
        taskIdPrefix: `day-${dayNumber}-task` // Changed from dayX to match database
      };
    })
  ];

  console.log('🔧 AllAssignmentsPage - Fixed task IDs:', {
    weeklyTaskIds: weeklyAssignments.map((_, index) => `assignment-${index}`),
    dailyTaskIds: dailyAssignments.map((_, index) => `day-${index + 1}-task`),
    completedTasks
  });

  if (progressLoading) {
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

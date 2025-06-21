
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import AssignmentList from '@/components/AssignmentList';
import TextContent from '@/components/ui/TextContent';
import { getDayStatus } from '@/components/daily/DayStatus';
import { Assignment } from '@/data/assignments/fastAndSlow';

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
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  // Simulate user progress (unlock all days for assignments page)
  const daysUnlocked = totalDays;

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

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

  // Create assignment metadata for locked status
  const assignmentMetadata = [
    // Weekly assignments metadata (always unlocked)
    ...weeklyAssignments.map((_, index) => ({ 
      isLocked: false, 
      dayNumber: null,
      taskIdPrefix: `weekly-assignment-${index + 1}`
    })),
    // Daily assignments metadata (check lock status, only for existing assignments)
    ...dailyAssignments.map((_, index) => {
      const dayNumber = index + 1;
      const status = getDayStatus(dayNumber, daysUnlocked);
      return {
        isLocked: status === 'locked' || status === 'tomorrow',
        dayNumber: null, // No day number display
        taskIdPrefix: `day${dayNumber}`
      };
    })
  ];

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

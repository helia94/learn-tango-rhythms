// DayItem.tsx  – refactored (same file, smaller pieces)
import React, { useState, useEffect, useCallback } from 'react';
import { Lock, CheckCircle, Play, RotateCw } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import DayContent from './DayContent';
import { DayStatus } from './DayStatus';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';

/* ---------- helpers ---------- */
const formatTime = (ms: number) => {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return h ? `unlock in ${h}h ${m}m` : `unlock in ${m}m`;
};

/* ---------- UI atoms ---------- */
const IconTitle: React.FC<{ icon: React.ReactNode; day: number }> = ({ icon, day }) => (
  <div className="flex items-center gap-3">
    {icon}
    <span className="text-xl font-display text-gray-700">Day {day}</span>
  </div>
);

const UnlockButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <Button
    onClick={onClick}
    size="sm"
    variant="outline"
    className="ml-auto bg-golden-yellow/20 hover:bg-golden-yellow/30 border-golden-yellow/30 text-golden-yellow"
  >
    <Play className="w-4 h-4 mr-1" />
    {label}
  </Button>
);

const RetryButton: React.FC<{ onClick: () => void; loading: boolean; label: string }> = ({
  onClick,
  loading,
  label
}) => (
  <Button
    onClick={onClick}
    disabled={loading}
    size="sm"
    variant="outline"
    className="ml-auto bg-golden-yellow/20 hover:bg-golden-yellow/30 border-golden-yellow/30 text-golden-yellow"
  >
    {loading && <RotateCw className="animate-spin w-4 h-4 mr-1" />}
    {loading ? 'checking…' : label}
  </Button>
);

/* ---------- main component ---------- */
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
  const [showManual, setShowManual] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const { getTimeUntilNextActivation, canActivateDay, isLoading } = useDailyTopicActivation(
    topicName,
    topicIndex,
    7
  );

  const refreshUnlockInfo = useCallback(
    async (manual = false) => {
      const canAct = await canActivateDay(dayNumber);
      if (canAct) {
        setCanActivateNow(true);
        setTimeUntilUnlock(null);
        setShowManual(false);
      } else {
        const ms = await getTimeUntilNextActivation();
        if (ms == null || ms < 0) {
          setShowManual(true);
          setTimeUntilUnlock(null);
        } else {
          setTimeUntilUnlock(formatTime(ms));
          setShowManual(false);
        }
      }
      if (manual) setRetrying(false);
    },
    [canActivateDay, getTimeUntilNextActivation, dayNumber]
  );

  useEffect(() => {
    if (status === 'tomorrow' && !isLoading) refreshUnlockInfo();
  }, [status, isLoading, refreshUnlockInfo]);

  /* ---------- render blocks ---------- */
  if (status === 'locked') {
    return (
      <div className="bg-warm-brown/10 rounded-2xl border border-cream/20 overflow-hidden px-6 py-4 flex items-center gap-4">
        <IconTitle icon={<Lock className="w-5 h-5 text-gray-400" />} day={dayNumber} />
        <span className="text-sm text-gray-400 font-medium ml-auto">{t('daily.locked')}</span>
      </div>
    );
  }

  if (status === 'tomorrow') {
    return (
      <div className="bg-warm-brown/10 rounded-2xl border border-cream/20 overflow-hidden px-6 py-4 flex items-center gap-4">
        <IconTitle icon={<Lock className="w-5 h-5 text-golden-yellow" />} day={dayNumber} />

        {canActivateNow && onDayActivation && (
          <UnlockButton onClick={onDayActivation} label={t('daily.unlockDay')} />
        )}

        {!canActivateNow && timeUntilUnlock && (
          <span className="text-sm text-golden-yellow font-medium ml-auto">{timeUntilUnlock}</span>
        )}

        {showManual && (
          <RetryButton
            onClick={() => {
              setRetrying(true);
              refreshUnlockInfo(true);
            }}
            loading={retrying}
            label={t('daily.checkUnlockNow')}
          />
        )}

        {!canActivateNow && !timeUntilUnlock && !showManual && (
          <span className="text-sm text-golden-yellow font-medium ml-auto">
            {t('daily.availableTomorrow')}
          </span>
        )}
      </div>
    );
  }

  /* unlocked */
  return (
    <AccordionItem
      value={`day-${dayNumber}`}
      className="bg-warm-brown/10 rounded-2xl border border-cream/20 overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <IconTitle
          icon={
            isCompleted ? (
              <CheckCircle className="w-5 h-5 text-sage-green" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
            )
          }
          day={dayNumber}
        />
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

// DayItem.tsx  – bullet-proof manual check
import React, { useState, useEffect, useCallback } from 'react';
import { Lock, CheckCircle, Play, RotateCw } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import DayContent from './DayContent';
import { DayStatus } from './DayStatus';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';

/* ───── helpers ───── */
const format = (ms: number) =>
  ms < 60_000
    ? `unlock in ${Math.ceil(ms / 1_000)}s`
    : `unlock in ${Math.floor(ms / 3_600_000)}h ${Math.floor((ms % 3_600_000) / 60_000)}m`;

/* ───── tiny UI bits ───── */
const Title: React.FC<{ icon: React.ReactNode; day: number }> = ({ icon, day }) => (
  <div className="flex items-center gap-3">
    {icon}
    <span className="text-xl font-display text-gray-700">Day {day}</span>
  </div>
);

const GoldBtn: React.FC<React.ComponentProps<typeof Button>> = (p) => (
  <Button
    {...p}
    size="sm"
    variant="outline"
    className="ml-auto bg-golden-yellow/20 hover:bg-golden-yellow/30 border-golden-yellow/30 text-golden-yellow"
  />
);

/* ───── main ───── */
interface Props {
  dayNumber: number;
  status: DayStatus;
  isCompleted: boolean;
  completedTasks: Record<string, number>;
  onTaskLevelChange: (id: string, lvl: number) => void;
  onDayActivation?: () => void;
  topicName?: string;
  topicIndex?: number;
}

export default function DayItem({
  dayNumber,
  status,
  isCompleted,
  completedTasks,
  onTaskLevelChange,
  onDayActivation,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}: Props) {
  const { t } = useTranslation();

  /* state */
  const [time, setTime] = useState<string | null>(null);
  const [canUnlock, setCanUnlock] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [manualAllowed, setManualAllowed] = useState(false);

  /* hook */
  const { getTimeUntilNextActivation, canActivateDay, isLoading } = useDailyTopicActivation(
    topicName,
    topicIndex,
    7
  );

  /* unified check */
  const calc = useCallback(async () => {
    if (await canActivateDay(dayNumber)) {
      setCanUnlock(true);
      setTime(null);
      return true;
    }
    const ms = await getTimeUntilNextActivation();
    if (ms != null && ms > 0) {
      setTime(format(ms));
      return true;
    }
    return false;
  }, [canActivateDay, getTimeUntilNextActivation, dayNumber]);

  /* auto run once hook ready */
  useEffect(() => {
    if (status === 'tomorrow' && !isLoading) {
      calc().then((ok) => setManualAllowed(!ok));
    }
  }, [status, isLoading, calc]);

  /* manual button handler – poll until success or 6 s */
  const handleManual = async () => {
    setRetrying(true);
    for (let i = 0; i < 6; i++) {
      if (await calc()) break;
      await new Promise((r) => setTimeout(r, 1000));
    }
    setRetrying(false);
    setManualAllowed(false); // button disappears either way
  };

  /* ─── render sections ─── */
  if (status === 'locked') {
    return (
      <div className="bg-warm-brown/10 rounded-2xl border border-cream/20 overflow-hidden px-6 py-4 flex items-center gap-4">
        <Title icon={<Lock className="w-5 h-5 text-gray-400" />} day={dayNumber} />
        <span className="text-sm text-gray-400 font-medium ml-auto">{t('daily.locked')}</span>
      </div>
    );
  }

  if (status === 'tomorrow') {
    return (
      <div className="bg-warm-brown/10 rounded-2xl border border-cream/20 overflow-hidden px-6 py-4 flex items-center gap-4">
        <Title icon={<Lock className="w-5 h-5 text-golden-yellow" />} day={dayNumber} />

        {canUnlock && onDayActivation && (
          <GoldBtn onClick={onDayActivation}>
            <Play className="w-4 h-4 mr-1" />
            {t('daily.unlockDay')}
          </GoldBtn>
        )}

        {!canUnlock && time && (
          <span className="text-sm text-golden-yellow font-medium ml-auto">{time}</span>
        )}

        {manualAllowed && (
          <GoldBtn onClick={handleManual} disabled={retrying}>
            {retrying && <RotateCw className="animate-spin w-4 h-4 mr-1" />}
            {t('daily.checkUnlockNow')}
          </GoldBtn>
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
        <Title
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
}

/* ********************************************************************** */

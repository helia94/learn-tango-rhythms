
import React from 'react';
import { Info } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const InfoModal: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors flex items-center justify-center ml-2"
          aria-label={t('progress.levelInfo')}
        >
          <Info className="w-3 h-3 text-gray-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {t('progress.trackingTitle')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent flex-shrink-0 mt-0.5"></div>
            <div>
              <span className="font-medium">{t('progress.notStarted')}</span> {t('progress.notStartedDesc')}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow flex-shrink-0 mt-0.5"></div>
            <div>
              <span className="font-medium">{t('progress.firstAttempt')}</span> {t('progress.firstAttemptDesc')}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex gap-1 flex-shrink-0 mt-0.5">
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
            </div>
            <div>
              <span className="font-medium">{t('progress.practiceMode')}</span> {t('progress.practiceModeDesc')}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex gap-1 flex-shrink-0 mt-0.5">
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
            </div>
            <div>
              <span className="font-medium">{t('progress.gettingThere')}</span> {t('progress.gettingThereDesc')}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex gap-1 flex-shrink-0 mt-0.5">
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
            </div>
            <div>
              <span className="font-medium">{t('progress.mastered')}</span> {t('progress.masteredDesc')}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;

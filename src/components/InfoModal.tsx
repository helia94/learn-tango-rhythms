
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
          aria-label="Level information"
        >
          <Info className="w-3 h-3 text-gray-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Tracking Progress
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent flex-shrink-0 mt-0.5"></div>
            <div>
              <span className="font-medium">Not started:</span> You haven't tried this yet
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow flex-shrink-0 mt-0.5"></div>
            <div>
              <span className="font-medium">First attempt:</span> You gave it a try once
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex gap-1 flex-shrink-0 mt-0.5">
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
            </div>
            <div>
              <span className="font-medium">Practice mode:</span> You can do it when concentrating, but it needs focus and doesn't work in social dancing yet
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex gap-1 flex-shrink-0 mt-0.5">
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-golden-yellow border-2 border-golden-yellow"></div>
            </div>
            <div>
              <span className="font-medium">Getting there:</span> You can use it sometimes at milongas and practicas, but it's not automatic yet
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
              <span className="font-medium">Mastered:</span> This comes naturally to you now - you do it effortlessly all the time
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;

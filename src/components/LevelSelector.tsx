
import React from 'react';
import { Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from '@/hooks/useTranslation';

interface LevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
  variant?: 'default' | 'sage' | 'golden' | 'dusty-rose' | 'terracotta';
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  level,
  onLevelChange,
  variant = 'sage'
}) => {
  const { t } = useTranslation();

  const getVariantColor = (variant: string) => {
    switch (variant) {
      case 'golden':
        return 'bg-golden-yellow border-golden-yellow';
      case 'dusty-rose':
        return 'bg-dusty-rose border-dusty-rose';
      case 'terracotta':
        return 'bg-terracotta border-terracotta';
      case 'sage':
      default:
        return 'bg-sage-green border-sage-green';
    }
  };

  const levelDescriptions = [
    t('assignments.level0'),
    t('assignments.level1'),
    t('assignments.level2'),
    t('assignments.level3'),
    t('assignments.level4')
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((circleLevel) => (
          <button
            key={circleLevel}
            onClick={() => onLevelChange(level === circleLevel ? 0 : circleLevel)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
              circleLevel <= level
                ? getVariantColor(variant)
                : 'bg-transparent border-gray-300 hover:border-gray-400'
            }`}
            aria-label={`Level ${circleLevel}`}
          />
        ))}
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('assignments.levelInfo')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {levelDescriptions.map((description, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                  {index}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LevelSelector;

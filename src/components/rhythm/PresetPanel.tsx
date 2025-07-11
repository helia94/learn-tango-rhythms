
import React from 'react';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { PresetRhythm } from '@/types/rhythm';
import { useTranslation } from '@/hooks/useTranslation';

interface PresetPanelProps {
  presetRhythms: PresetRhythm[];
  onApplyPreset: (trackId: string, preset: PresetRhythm) => void;
}

const PresetPanel = ({ presetRhythms, onApplyPreset }: PresetPanelProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Group presets by category
  const groupedPresets = presetRhythms.reduce((acc, preset) => {
    if (!acc[preset.category]) {
      acc[preset.category] = [];
    }
    acc[preset.category].push(preset);
    return acc;
  }, {} as Record<string, PresetRhythm[]>);

  return (
    <div className="boho-panel p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Zap className="w-8 h-8 text-burnt-orange" />
        <h3 className="boho-subtitle text-lg">{t('rhythm.presets')}</h3>
      </div>
      
      {/* Desktop: Grid Layout */}
      <div className="hidden md:block space-y-6">
        {Object.entries(groupedPresets).map(([category, presets]) => (
          <div key={category}>
            <div className="track-label mb-4 inline-block text-sm">
              {category}
            </div>
            <div className="flex flex-wrap gap-3">
              {presets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => onApplyPreset('bass', preset)}
                  className="preset-button text-sm"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Carousel with category labels */}
      <div className="md:hidden">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {Object.entries(groupedPresets).map(([category, presets]) => [
              // Category label as a carousel item
              <CarouselItem key={`${category}-label`} className="pl-2 basis-auto">
                <div className="track-label text-xs px-3 py-1">
                  {category}
                </div>
              </CarouselItem>,
              // Preset buttons for this category
              ...presets.map(preset => (
                <CarouselItem key={preset.name} className="pl-2 basis-auto">
                  <button
                    onClick={() => onApplyPreset('bass', preset)}
                    className="preset-button text-sm whitespace-nowrap"
                  >
                    {preset.name}
                  </button>
                </CarouselItem>
              ))
            ]).flat()}
          </CarouselContent>
          <CarouselPrevious className="boho-button" />
          <CarouselNext className="boho-button" />
        </Carousel>
      </div>

      {/* Quiz Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => navigate('/rhythmlab/quiz')}
          className="boho-button text-lg px-8 py-4"
        >
          {t('quiz.takeQuiz')}
        </Button>
      </div>
    </div>
  );
};

export default PresetPanel;

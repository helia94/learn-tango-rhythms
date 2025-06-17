
import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SimpleRhythmPlayer from '@/components/SimpleRhythmPlayer';

interface InteractiveRhythmPlayerProps {
  className?: string;
}

const InteractiveRhythmPlayer: React.FC<InteractiveRhythmPlayerProps> = ({ className = "mb-8" }) => {
  const [rhythmSpeed, setRhythmSpeed] = useState<string>('2');

  const getRhythmPattern = (speed: string) => {
    switch (speed) {
      case '1': return [true, false, false, false]; // Beat 1 only
      case '2': return [true, false, true, false];  // Beats 1 and 3
      case '4': return [true, true, true, true];    // All beats
      default: return [true, false, true, false];
    }
  };

  return (
    <div className={className}>
      <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
        {/* Speed Toggle */}
        <div className="flex justify-center mb-6">
          <ToggleGroup 
            type="single" 
            value={rhythmSpeed} 
            onValueChange={(value) => value && setRhythmSpeed(value)}
            className="bg-warm-brown/40 rounded-lg p-1"
          >
            <ToggleGroupItem 
              value="1" 
              className="data-[state=on]:bg-terracotta data-[state=on]:text-cream text-gray-600 hover:text-gray-700"
            >
              1
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="2" 
              className="data-[state=on]:bg-golden-yellow data-[state=on]:text-warm-brown text-gray-600 hover:text-gray-700"
            >
              2
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="4" 
              className="data-[state=on]:bg-dusty-rose data-[state=on]:text-cream text-gray-600 hover:text-gray-700"
            >
              4
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Rhythm Player */}
        <SimpleRhythmPlayer 
          pattern={getRhythmPattern(rhythmSpeed)} 
          label=""
          speedLevel={1}
        />
      </div>
    </div>
  );
};

export default InteractiveRhythmPlayer;

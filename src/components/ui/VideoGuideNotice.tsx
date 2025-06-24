
import React from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface VideoGuideNoticeProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const VideoGuideNotice: React.FC<VideoGuideNoticeProps> = ({
  className = "",
  variant = 'default'
}) => {
  const { t } = useTranslation();

  const isCompact = variant === 'compact';

  return (
    <div className={cn(
      // Dark video-style background
      "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
      "rounded-xl border border-gray-700/50 shadow-2xl",
      "relative overflow-hidden",
      isCompact ? "p-6" : "p-8 md:p-12",
      // Aspect ratio similar to video players
      "aspect-video min-h-[200px]",
      className
    )}>
      {/* Subtle overlay to enhance video feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          {/* Large play button */}
          <div className="flex justify-center">
            <div className="bg-white/90 hover:bg-white rounded-full p-4 md:p-6 shadow-lg transition-all duration-300 hover:scale-110">
              <Play className={cn(
                "text-gray-800 fill-gray-800",
                isCompact ? "w-8 h-8" : "w-12 h-12 md:w-16 md:h-16"
              )} />
            </div>
          </div>
          
          {/* Text */}
          <div className="space-y-2">
            <p className={cn(
              "text-white font-semibold",
              isCompact ? "text-lg" : "text-xl md:text-2xl"
            )}>
              {t('common.videoGuideComingSoon' as any)}
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto opacity-80" />
          </div>
        </div>
      </div>
      
      {/* Corner elements to enhance video player feel */}
      <div className="absolute top-4 right-4 opacity-60">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default VideoGuideNotice;

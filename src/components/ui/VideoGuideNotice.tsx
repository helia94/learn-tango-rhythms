
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
      "rounded-lg border border-gray-700/50 shadow-lg",
      "relative overflow-hidden",
      // Much smaller dimensions
      isCompact ? "p-3 h-20" : "p-4 h-24",
      "flex items-center justify-center",
      className
    )}>
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      
      <div className="relative z-10 flex items-center gap-3">
        {/* Smaller play button */}
        <div className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 hover:scale-105">
          <Play className={cn(
            "text-gray-800 fill-gray-800",
            isCompact ? "w-4 h-4" : "w-5 h-5"
          )} />
        </div>
        
        {/* Compact text */}
        <p className={cn(
          "text-white font-medium",
          isCompact ? "text-sm" : "text-base"
        )}>
          {t('common.videoGuideComingSoon' as any)}
        </p>
      </div>
      
      {/* Small corner indicator */}
      <div className="absolute top-2 right-2 opacity-50">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default VideoGuideNotice;

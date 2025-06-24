
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
      "bg-gradient-to-br from-sage-green/10 to-deep-teal/5 backdrop-blur-sm rounded-2xl border border-sage-green/20",
      isCompact ? "p-4" : "p-6 md:p-8",
      className
    )}>
      <div className="flex items-center justify-center gap-3">
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-br from-sage-green/20 to-deep-teal/10 rounded-full p-3">
            <Play className="w-6 h-6 text-sage-green" />
          </div>
        </div>
        <div className="text-center">
          <p className={cn(
            "text-gray-700 font-medium",
            isCompact ? "text-base" : "text-lg md:text-xl"
          )}>
            {t('common.videoGuideComingSoon' as any)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoGuideNotice;

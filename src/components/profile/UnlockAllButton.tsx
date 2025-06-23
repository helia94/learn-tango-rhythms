
import React from 'react';
import { useAdminUnlockAll } from '@/hooks/useAdminUnlockAll';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Unlock, Lock } from 'lucide-react';
import { toast } from 'sonner';

const UnlockAllButton: React.FC = () => {
  const { t } = useTranslation();
  const { isAdmin, isUnlockAllActive, isLoading, toggleUnlockAll } = useAdminUnlockAll();

  if (!isAdmin) {
    return null;
  }

  const handleToggle = async () => {
    try {
      await toggleUnlockAll();
      toast.success(
        isUnlockAllActive 
          ? t('admin.deactivateUnlockAll')
          : t('admin.activateUnlockAll')
      );
    } catch (error) {
      toast.error('Failed to toggle Unlock All');
    }
  };

  return (
    <div className="bg-gradient-to-br from-paprika/20 to-burnt-orange/10 rounded-[20px] p-6 border border-paprika/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-paprika/20 rounded-full flex items-center justify-center">
          {isUnlockAllActive ? (
            <Unlock className="w-5 h-5 text-paprika" />
          ) : (
            <Lock className="w-5 h-5 text-paprika" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-warm-brown">{t('admin.controls')}</h3>
          <p className="text-sm text-mushroom">{t('admin.unlockAllDescription')}</p>
        </div>
      </div>
      
      <Button
        onClick={handleToggle}
        disabled={isLoading}
        className={`w-full ${
          isUnlockAllActive
            ? 'bg-mushroom hover:bg-warm-brown text-white'
            : 'bg-paprika hover:bg-burnt-orange text-white'
        } rounded-organic transition-all duration-300`}
      >
        {isLoading ? (
          t('admin.processing')
        ) : isUnlockAllActive ? (
          <>
            <Lock className="w-4 h-4 mr-2" />
            {t('admin.deactivateUnlockAll')}
          </>
        ) : (
          <>
            <Unlock className="w-4 h-4 mr-2" />
            {t('admin.activateUnlockAll')}
          </>
        )}
      </Button>
      
      {isUnlockAllActive && (
        <div className="mt-3 p-3 bg-golden-yellow/20 rounded-lg">
          <p className="text-xs text-warm-brown font-medium">
            {t('admin.unlockAllActiveWarning')}
          </p>
        </div>
      )}
    </div>
  );
};

export default UnlockAllButton;

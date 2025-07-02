import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

const EmailPreferences: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const { t } = useTranslation();

  const handleEmailPreferenceChange = async (newPreference: string) => {
    try {
      const { error } = await updateProfile({ 
        email_preferences: newPreference 
      });
      
      if (error) {
        toast.error(t('profile.sections.messages.updateFailed'));
      } else {
        toast.success(t('profile.sections.messages.profileUpdated'));
      }
    } catch (error) {
      toast.error(t('profile.sections.messages.unexpectedError'));
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-sage-green/20 rounded-full flex items-center justify-center">
          <Mail className="w-5 h-5 text-sage-green" />
        </div>
        <div>
          <h3 className="text-lg font-display text-warm-brown">
            {t('profile.sections.emailPreferences' as any)}
          </h3>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-warm-brown font-medium text-sm">
          {t('profile.sections.emailPreferences' as any)}
        </Label>
        <Select
          value={profile.email_preferences || 'weekly_reminder'}
          onValueChange={handleEmailPreferenceChange}
        >
          <SelectTrigger className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">
              {t('profile.sections.emailPreferencesOptions.none' as any)}
            </SelectItem>
            <SelectItem value="important_only">
              {t('profile.sections.emailPreferencesOptions.important_only' as any)}
            </SelectItem>
            <SelectItem value="weekly_reminder">
              {t('profile.sections.emailPreferencesOptions.weekly_reminder' as any)}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 text-xs text-mushroom">
        {profile.email_preferences === 'none' && (
          <p>{t('profile.sections.emailPreferencesOptions.none' as any)}</p>
        )}
        {profile.email_preferences === 'important_only' && (
          <p>{t('profile.sections.emailPreferencesOptions.important_only' as any)}</p>
        )}
        {(profile.email_preferences === 'weekly_reminder' || !profile.email_preferences) && (
          <p>{t('profile.sections.emailPreferencesOptions.weekly_reminder' as any)}</p>
        )}
      </div>
    </Card>
  );
};

export default EmailPreferences;
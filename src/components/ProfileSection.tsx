
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguageContext, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Settings, LogOut, Globe } from 'lucide-react';

const ProfileSection: React.FC = () => {
  const { user, profile, updateProfile, signOut } = useAuth();
  const { t } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguageContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    preferred_language: profile?.preferred_language || currentLanguage,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const { error } = await updateProfile(editForm);
      
      if (error) {
        if (error.message.includes('duplicate key')) {
          toast.error(t('profile.sections.messages.usernameTaken'));
        } else {
          toast.error(t('profile.sections.messages.updateFailed'));
        }
      } else {
        // Update the current language if it changed
        if (editForm.preferred_language !== currentLanguage) {
          setLanguage(editForm.preferred_language as Language);
        }
        toast.success(t('profile.sections.messages.profileUpdated'));
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(t('profile.sections.messages.unexpectedError'));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditForm({
      username: profile?.username || '',
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      preferred_language: profile?.preferred_language || currentLanguage,
    });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(t('profile.sections.messages.signedOut'));
    } catch (error) {
      toast.error(t('profile.sections.messages.signOutFailed'));
    }
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-terracotta" />
          </div>
          <div>
            <h2 className="text-xl font-display text-warm-brown">
              {profile.full_name || profile.username || 'Anonymous User'}
            </h2>
            <p className="text-sm text-mushroom">{user.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            size="sm"
            className="border-sage-green/30 text-sage-green hover:bg-sage-green/10"
          >
            <Settings className="w-4 h-4 mr-1" />
            {isEditing ? t('profile.sections.cancel') : t('profile.sections.edit')}
          </Button>
          
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="border-terracotta/30 text-terracotta hover:bg-terracotta/10"
          >
            <LogOut className="w-4 h-4 mr-1" />
            {t('profile.sections.signOut')}
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-warm-brown font-medium">
              {t('profile.sections.fullName')}
            </Label>
            <Input
              id="full_name"
              value={editForm.full_name}
              onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
              className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20"
              placeholder={t('profile.sections.placeholders.fullName')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-warm-brown font-medium">
              {t('profile.sections.username')}
            </Label>
            <Input
              id="username"
              value={editForm.username}
              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20"
              placeholder={t('profile.sections.placeholders.username')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-warm-brown font-medium">
              {t('profile.sections.bio')}
            </Label>
            <Input
              id="bio"
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20"
              placeholder={t('profile.sections.placeholders.bio')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_language" className="text-warm-brown font-medium">
              {t('profile.sections.preferredLanguage')}
            </Label>
            <Select
              value={editForm.preferred_language}
              onValueChange={(value) => setEditForm({ ...editForm, preferred_language: value })}
            >
              <SelectTrigger className="border-sage-green/30 focus:border-terracotta focus:ring-terracotta/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={isUpdating}
              className="bg-terracotta hover:bg-burnt-orange text-white rounded-organic"
            >
              {isUpdating ? t('profile.sections.saving') : t('profile.sections.saveChanges')}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-sage-green/30 text-sage-green hover:bg-sage-green/10 rounded-organic"
            >
              {t('profile.sections.cancel')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {profile.username && (
            <div>
              <Label className="text-warm-brown font-medium text-sm">{t('profile.sections.username')}</Label>
              <p className="text-gray-700">{profile.username}</p>
            </div>
          )}
          
          {profile.bio && (
            <div>
              <Label className="text-warm-brown font-medium text-sm">{t('profile.sections.bio')}</Label>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}

          <div>
            <Label className="text-warm-brown font-medium text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {t('profile.sections.preferredLanguage')}
            </Label>
            <p className="text-gray-700">
              {profile.preferred_language === 'de' ? '🇩🇪 Deutsch' : '🇺🇸 English'}
            </p>
          </div>
          
          <div>
            <Label className="text-warm-brown font-medium text-sm">{t('profile.sections.memberSince')}</Label>
            <p className="text-gray-700">
              {new Date(profile.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProfileSection;

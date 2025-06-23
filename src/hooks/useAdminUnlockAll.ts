
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useAdminUnlockAll = () => {
  const { user, profile } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUnlockAllActive, setIsUnlockAllActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!profile?.username) return;

      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('username')
          .eq('username', profile.username)
          .single();

        setIsAdmin(!!data && !error);
      } catch (error) {
        console.log('Not an admin user');
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [profile?.username]);

  // Check if unlock all is currently active
  useEffect(() => {
    const checkUnlockAllStatus = async () => {
      if (!isAdmin || !profile?.username) return;

      try {
        const { data, error } = await supabase
          .from('unlock_all_activated')
          .select('id')
          .eq('username', profile.username)
          .eq('index_activated', 1) // Using index 1 for the unlock all feature
          .single();

        setIsUnlockAllActive(!!data && !error);
      } catch (error) {
        setIsUnlockAllActive(false);
      }
    };

    checkUnlockAllStatus();
  }, [isAdmin, profile?.username]);

  const toggleUnlockAll = async () => {
    if (!isAdmin || !profile?.username) return;

    setIsLoading(true);
    try {
      if (isUnlockAllActive) {
        // Remove the unlock all activation
        const { error } = await supabase
          .from('unlock_all_activated')
          .delete()
          .eq('username', profile.username)
          .eq('index_activated', 1);

        if (error) throw error;
        setIsUnlockAllActive(false);
      } else {
        // Add the unlock all activation
        const { error } = await supabase
          .from('unlock_all_activated')
          .insert({
            username: profile.username,
            index_activated: 1
          });

        if (error) throw error;
        setIsUnlockAllActive(true);
      }
    } catch (error) {
      console.error('Error toggling unlock all:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAdmin,
    isUnlockAllActive,
    isLoading,
    toggleUnlockAll
  };
};

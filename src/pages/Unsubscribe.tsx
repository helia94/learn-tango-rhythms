import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Mail } from 'lucide-react';

const Unsubscribe: React.FC = () => {
  const { type, token } = useParams<{ type: string; token: string }>();
  const { t } = useTranslation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const handleUnsubscribe = async () => {
      if (!token) {
        setStatus('error');
        setResult({ error: 'Missing token' });
        return;
      }

      try {
        const { data, error } = await supabase.rpc('use_unsubscribe_token', {
          _token: token
        });

        if (error) {
          setStatus('error');
          setResult({ error: error.message });
        } else if (data && typeof data === 'object' && (data as any).success) {
          setStatus('success');
          setResult(data);
        } else {
          setStatus('error');
          setResult({ error: 'Invalid or expired token' });
        }
      } catch (err) {
        setStatus('error');
        setResult({ error: 'An unexpected error occurred' });
      }
    };

    handleUnsubscribe();
  }, [token]);

  const getStatusMessage = () => {
    if (status === 'loading') {
      return {
        title: 'Processing...',
        message: 'Please wait while we update your preferences.',
        icon: <Mail className="w-12 h-12 text-sage-green animate-pulse" />
      };
    }

    if (status === 'success') {
      const preferenceText = result.preference === 'none' 
        ? 'You will no longer receive any emails from us.'
        : 'You will only receive important updates.';
      
      return {
        title: 'Successfully Updated',
        message: `Your email preferences have been updated. ${preferenceText}`,
        icon: <CheckCircle className="w-12 h-12 text-sage-green" />
      };
    }

    return {
      title: 'Something Went Wrong',
      message: result?.error || 'The unsubscribe link may be invalid or expired.',
      icon: <XCircle className="w-12 h-12 text-terracotta" />
    };
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-organic p-8 text-center">
        <div className="mb-6 flex justify-center">
          {statusInfo.icon}
        </div>
        
        <h1 className="text-2xl font-display text-warm-brown mb-4">
          {statusInfo.title}
        </h1>
        
        <p className="text-mushroom mb-6">
          {statusInfo.message}
        </p>
        
        {status === 'success' && (
          <div className="text-sm text-sage-green bg-sage-green/10 rounded-organic p-3">
            You can always update your email preferences in your account settings.
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-sm text-terracotta bg-terracotta/10 rounded-organic p-3">
            If you continue to have issues, please contact support.
          </div>
        )}
      </Card>
    </div>
  );
};

export default Unsubscribe;
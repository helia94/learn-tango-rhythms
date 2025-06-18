
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing Spotify connection...');

  useEffect(() => {
    handleSpotifyCallback();
  }, []);

  const handleSpotifyCallback = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const error = urlParams.get('error');

      // Check for authorization errors
      if (error) {
        setStatus('error');
        setMessage(`Spotify authorization failed: ${error}`);
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      // Verify state parameter for security
      const storedState = localStorage.getItem('spotify_auth_state');
      if (!state || state !== storedState) {
        setStatus('error');
        setMessage('Invalid state parameter. Please try connecting again.');
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      // Clear stored state
      localStorage.removeItem('spotify_auth_state');

      if (!code || !user) {
        setStatus('error');
        setMessage('Missing authorization code or user not logged in.');
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      // Call Supabase Edge Function to exchange code for tokens
      // This will be implemented in the next step
      setMessage('Exchanging authorization code for access tokens...');
      
      // For now, show success and redirect
      // In the next step, we'll implement the actual token exchange
      setStatus('success');
      setMessage('Spotify connected successfully! Redirecting...');
      setTimeout(() => navigate('/profile'), 2000);

    } catch (error) {
      console.error('Error in Spotify callback:', error);
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
      setTimeout(() => navigate('/profile'), 3000);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-8 h-8 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'error':
        return <XCircle className="w-8 h-8 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-700';
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-brown/5 via-sandy-beige/10 to-cream/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3">
            {getStatusIcon()}
            Spotify Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className={`text-lg ${getStatusColor()}`}>
            {message}
          </p>
          {status === 'loading' && (
            <p className="text-sm text-gray-600 mt-2">
              Please wait while we connect your Spotify account...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpotifyCallback;

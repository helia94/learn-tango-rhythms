
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SPOTIFY_CONFIG } from '@/config/spotify';

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const { user, session, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'retrying'>('loading');
  const [message, setMessage] = useState('Processing Spotify connection...');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    // SECURITY: Force HTTPS
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
      return;
    }

    // Wait for auth to finish loading before processing callback
    if (!authLoading) {
      handleSpotifyCallback();
    }
  }, [authLoading, user, session]);

  const validateSecurityState = (receivedState: string): boolean => {
    try {
      const storedStateData = sessionStorage.getItem('spotify_auth_state');
      if (!storedStateData) {
        console.error('No stored state found');
        return false;
      }

      const { state: storedState, timestamp, userId } = JSON.parse(storedStateData);
      
      // SECURITY: Validate state matches
      if (receivedState !== storedState) {
        console.error('State mismatch');
        return false;
      }

      // SECURITY: Check timestamp (5 minute window)
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      if (now - timestamp > fiveMinutes) {
        console.error('State expired');
        return false;
      }

      // SECURITY: Validate user ID matches
      if (user && userId !== user.id) {
        console.error('User ID mismatch');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating state:', error);
      return false;
    }
  };

  const handleSpotifyCallback = async (isRetry = false) => {
    if (isRetry) {
      setStatus('retrying');
      setMessage(`Retrying connection... (${retryCount + 1}/${maxRetries})`);
    }

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const error = urlParams.get('error');

      console.log('Spotify callback processing:', { 
        code: !!code, 
        state: !!state, 
        error, 
        user: !!user,
        session: !!session,
        isRetry,
        retryCount 
      });

      // Check for authorization errors
      if (error) {
        setStatus('error');
        if (error === 'access_denied') {
          setMessage('Spotify authorization was cancelled. Please try connecting again.');
        } else {
          setMessage(`Spotify authorization failed: ${error}`);
        }
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      // SECURITY: Enhanced state validation
      if (!state || !validateSecurityState(state)) {
        setStatus('error');
        setMessage('Security validation failed. Please try connecting again.');
        // Clear potentially compromised state
        sessionStorage.removeItem('spotify_auth_state');
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      // Clear used state
      sessionStorage.removeItem('spotify_auth_state');

      if (!code) {
        setStatus('error');
        setMessage('Missing authorization code from Spotify.');
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      if (!user || !session) {
        setStatus('error');
        setMessage('User not logged in. Please log in and try connecting Spotify again.');
        setTimeout(() => navigate('/auth'), 3000);
        return;
      }

      // SECURITY: Validate redirect URI matches exactly
      const currentUrl = new URL(window.location.href);
      const expectedUrl = new URL(SPOTIFY_CONFIG.REDIRECT_URI);
      
      if (currentUrl.origin !== expectedUrl.origin || currentUrl.pathname !== expectedUrl.pathname) {
        setStatus('error');
        setMessage('Invalid redirect URL. Security check failed.');
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      // Call Supabase Edge Function to exchange code for tokens
      if (!isRetry) {
        setMessage('Exchanging authorization code for access tokens...');
      }
      
      const { data, error: functionError } = await supabase.functions.invoke('spotify-oauth', {
        body: {
          code: code,
          redirectUri: SPOTIFY_CONFIG.REDIRECT_URI // SECURITY: Use fixed redirect URI
        },
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        }
      });

      if (functionError || !data?.success) {
        console.error('Function error:', functionError);
        
        // Retry logic for temporary failures
        if (retryCount < maxRetries && !isRetry) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            handleSpotifyCallback(true);
          }, 2000);
          return;
        }
        
        setStatus('error');
        setMessage('Failed to connect Spotify account. Please try again.');
        setTimeout(() => navigate('/profile'), 3000);
        return;
      }

      setStatus('success');
      setMessage('Spotify connected successfully! Redirecting...');
      
      // Add a small delay to ensure everything is properly saved
      setTimeout(() => {
        // Force a page refresh to ensure the SpotifyContext picks up the new connection
        window.location.href = '/profile';
      }, 1500);

    } catch (error) {
      console.error('Error in Spotify callback:', error);
      
      // Retry logic for network errors
      if (retryCount < maxRetries && !isRetry) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          handleSpotifyCallback(true);
        }, 2000);
        return;
      }
      
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
      setTimeout(() => navigate('/profile'), 3000);
    }
  };

  const handleManualRetry = () => {
    setRetryCount(0);
    handleSpotifyCallback(false);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-8 h-8 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'error':
        return <XCircle className="w-8 h-8 text-red-500" />;
      case 'retrying':
        return <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />;
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
      case 'retrying':
        return 'text-orange-700';
    }
  };

  // Show loading while auth is still loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-brown/5 via-sandy-beige/10 to-cream/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-lg text-blue-700">
              Loading authentication...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-brown/5 via-sandy-beige/10 to-cream/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3">
            {getStatusIcon()}
            Spotify Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className={`text-lg ${getStatusColor()}`}>
            {message}
          </p>
          
          {status === 'loading' && (
            <p className="text-sm text-gray-600">
              Please wait while we connect your Spotify account...
            </p>
          )}
          
          {status === 'retrying' && (
            <p className="text-sm text-orange-600">
              Connection issues detected. Attempting to retry...
            </p>
          )}
          
          {status === 'error' && retryCount >= maxRetries && (
            <Button 
              onClick={handleManualRetry}
              variant="outline"
              className="mt-4"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpotifyCallback;

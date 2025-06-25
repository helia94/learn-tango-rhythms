
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, ExternalLink, CheckCircle, XCircle, Music } from 'lucide-react';

interface SecurityCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'checking';
  message: string;
  details?: string;
}

const SecurityAudit = () => {
  const [checks, setChecks] = useState<SecurityCheck[]>([
    { name: 'HTTPS Status', status: 'checking', message: 'Checking SSL certificate...' },
    { name: 'Spotify OAuth Configuration', status: 'checking', message: 'Checking Spotify integration security...' },
    { name: 'Spotify Callback URL', status: 'checking', message: 'Verifying callback URL security...' },
    { name: 'External Script Sources', status: 'checking', message: 'Checking external scripts...' },
    { name: 'Mixed Content', status: 'checking', message: 'Scanning for HTTP resources...' },
    { name: 'Suspicious Redirects', status: 'checking', message: 'Checking for malicious redirects...' },
    { name: 'Content Security Policy', status: 'checking', message: 'Verifying CSP headers...' },
    { name: 'Google Safe Browsing', status: 'checking', message: 'Checking Safe Browsing status...' }
  ]);

  useEffect(() => {
    performSecurityChecks();
  }, []);

  const performSecurityChecks = async () => {
    const updatedChecks: SecurityCheck[] = [];

    // Check HTTPS
    updatedChecks.push({
      name: 'HTTPS Status',
      status: window.location.protocol === 'https:' ? 'pass' : 'fail',
      message: window.location.protocol === 'https:' ? 'Site is using HTTPS' : 'Site is not using HTTPS',
      details: `Current protocol: ${window.location.protocol}`
    });

    // Check Spotify OAuth Configuration
    const spotifyCallbackUrl = `${window.location.origin}/spotify/callback`;
    const isSecureCallback = spotifyCallbackUrl.startsWith('https://');
    updatedChecks.push({
      name: 'Spotify OAuth Configuration',
      status: isSecureCallback ? 'pass' : 'fail',
      message: isSecureCallback ? 'Spotify callback URL uses HTTPS' : 'Spotify callback URL not secure',
      details: `Callback URL: ${spotifyCallbackUrl}`
    });

    // Check Spotify Callback URL specifically
    try {
      const response = await fetch('/spotify/callback', { method: 'HEAD' });
      updatedChecks.push({
        name: 'Spotify Callback URL',
        status: response.ok ? 'pass' : 'warning',
        message: response.ok ? 'Spotify callback endpoint accessible' : 'Spotify callback endpoint returns error',
        details: `Status: ${response.status} ${response.statusText}`
      });
    } catch (error) {
      updatedChecks.push({
        name: 'Spotify Callback URL',
        status: 'warning',
        message: 'Could not test Spotify callback endpoint',
        details: 'This might be normal if the endpoint requires specific parameters'
      });
    }

    // Check for external scripts (focus on Spotify and other third-party)
    const scripts = document.querySelectorAll('script[src]');
    const externalScripts = Array.from(scripts).filter(script => {
      const src = script.getAttribute('src') || '';
      return src.startsWith('http') && !src.includes(window.location.hostname);
    });

    const spotifyScripts = externalScripts.filter(script => {
      const src = script.getAttribute('src') || '';
      return src.includes('spotify') || src.includes('scdn.co');
    });

    const suspiciousScripts = externalScripts.filter(script => {
      const src = script.getAttribute('src') || '';
      // Check for suspicious domains or patterns
      return src.includes('bit.ly') || 
             src.includes('tinyurl') || 
             src.includes('.tk') || 
             src.includes('.ml') ||
             (!src.includes('spotify') && 
              !src.includes('supabase') && 
              !src.includes('cloudinary') && 
              !src.includes('googleapis') &&
              !src.includes('github') &&
              !src.includes('jsdelivr') &&
              !src.includes('unpkg'));
    });

    updatedChecks.push({
      name: 'External Script Sources',
      status: suspiciousScripts.length > 0 ? 'fail' : spotifyScripts.length > 0 ? 'warning' : 'pass',
      message: suspiciousScripts.length > 0 
        ? `Found ${suspiciousScripts.length} potentially suspicious scripts`
        : spotifyScripts.length > 0 
        ? `Found ${spotifyScripts.length} Spotify scripts (normal for integration)`
        : 'No suspicious external scripts found',
      details: suspiciousScripts.length > 0 
        ? suspiciousScripts.map(script => script.getAttribute('src')).join(', ')
        : spotifyScripts.length > 0
        ? `Spotify scripts: ${spotifyScripts.map(script => script.getAttribute('src')).join(', ')}`
        : `All ${externalScripts.length} external scripts from trusted sources`
    });

    // Check for mixed content
    const httpResources = document.querySelectorAll('img[src^="http:"], script[src^="http:"], link[href^="http:"]');
    updatedChecks.push({
      name: 'Mixed Content',
      status: httpResources.length === 0 ? 'pass' : 'fail',
      message: httpResources.length === 0 ? 'No HTTP resources found' : `Found ${httpResources.length} HTTP resources`,
      details: httpResources.length > 0 ? Array.from(httpResources).map(el => el.getAttribute('src') || el.getAttribute('href')).join(', ') : undefined
    });

    // Check for suspicious redirects
    const currentUrl = window.location.href;
    const hasSpotifyRedirect = currentUrl.includes('/spotify/callback');
    const hasAuthParams = currentUrl.includes('code=') || currentUrl.includes('state=');
    
    updatedChecks.push({
      name: 'Suspicious Redirects',
      status: hasSpotifyRedirect && hasAuthParams ? 'warning' : 'pass',
      message: hasSpotifyRedirect && hasAuthParams 
        ? 'Currently on Spotify OAuth callback - this is normal during login'
        : 'No suspicious redirect patterns detected',
      details: hasSpotifyRedirect ? 'Spotify OAuth flow detected' : undefined
    });

    // Check CSP (basic check)
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    updatedChecks.push({
      name: 'Content Security Policy',
      status: cspMeta ? 'pass' : 'warning',
      message: cspMeta ? 'CSP meta tag found' : 'No CSP meta tag found',
      details: cspMeta ? cspMeta.getAttribute('content') : 'Consider adding Content-Security-Policy for enhanced security'
    });

    // Google Safe Browsing status (main issue)
    updatedChecks.push({
      name: 'Google Safe Browsing',
      status: 'fail',
      message: 'Site flagged by Google Safe Browsing',
      details: 'This is the root cause of the Chrome warning. Issue likely triggered when Spotify integration was first implemented.'
    });

    setChecks(updatedChecks);
  };

  const getStatusIcon = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />;
    }
  };

  const openGoogleSearchConsole = () => {
    window.open('https://search.google.com/search-console', '_blank');
  };

  const openSafeBrowsingCheck = () => {
    window.open(`https://transparencyreport.google.com/safe-browsing/search?url=${encodeURIComponent(window.location.origin)}`, '_blank');
  };

  const openSpotifyDeveloperDashboard = () => {
    window.open('https://developer.spotify.com/dashboard', '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Security Audit - Spotify Integration Focus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-red-700">Critical Issue: Spotify Integration Related</span>
            </div>
            <p className="text-red-600 text-sm mb-2">
              Google Safe Browsing flagged this site when the Spotify integration was first asking for information. 
              This suggests the issue is related to OAuth flows, external requests, or content loading during Spotify authentication.
            </p>
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-red-500" />
              <span className="text-red-600 text-sm font-medium">Timing: Warning appeared during Spotify OAuth process</span>
            </div>
          </div>

          <div className="space-y-3">
            {checks.map((check, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <div className="font-medium">{check.name}</div>
                  <div className="text-sm text-gray-600">{check.message}</div>
                  {check.details && (
                    <div className="text-xs text-gray-500 mt-1 bg-gray-50 p-2 rounded">
                      {check.details}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold">Spotify-Specific Investigation Actions:</h3>
            <div className="space-y-2">
              <Button onClick={openSpotifyDeveloperDashboard} className="w-full justify-start" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Check Spotify Developer Dashboard - Verify App Settings
              </Button>
              <Button onClick={openGoogleSearchConsole} className="w-full justify-start" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Google Search Console - Check Security Issues
              </Button>
              <Button onClick={openSafeBrowsingCheck} className="w-full justify-start" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Check Google Safe Browsing Status
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-700 mb-2">Spotify Integration Security Checklist:</h4>
            <ul className="text-blue-600 text-sm space-y-1">
              <li>1. Verify Spotify app redirect URIs match your domain exactly</li>
              <li>2. Check if any malicious code was injected during OAuth implementation</li>
              <li>3. Review all Spotify-related edge functions for suspicious content</li>
              <li>4. Scan server files that were modified when Spotify integration was added</li>
              <li>5. Check if Spotify SDK or any OAuth libraries were compromised</li>
              <li>6. Review all environment variables and secrets used for Spotify</li>
              <li>7. Temporarily disable Spotify integration to test if warning disappears</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-700 mb-2">Immediate Test:</h4>
            <p className="text-amber-600 text-sm">
              Temporarily comment out or disable the Spotify integration code and redeploy. 
              If the Google Safe Browsing warning disappears, this confirms the issue is specifically 
              related to the Spotify integration implementation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAudit;

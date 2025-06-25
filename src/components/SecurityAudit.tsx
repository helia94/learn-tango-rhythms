
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface SecurityCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'checking';
  message: string;
  details?: string;
}

const SecurityAudit = () => {
  const [checks, setChecks] = useState<SecurityCheck[]>([
    { name: 'HTTPS Status', status: 'checking', message: 'Checking SSL certificate...' },
    { name: 'Mixed Content', status: 'checking', message: 'Scanning for HTTP resources...' },
    { name: 'External Links', status: 'checking', message: 'Auditing external links...' },
    { name: 'Script Sources', status: 'checking', message: 'Checking script sources...' },
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

    // Check for mixed content
    const httpResources = document.querySelectorAll('img[src^="http:"], script[src^="http:"], link[href^="http:"]');
    updatedChecks.push({
      name: 'Mixed Content',
      status: httpResources.length === 0 ? 'pass' : 'fail',
      message: httpResources.length === 0 ? 'No HTTP resources found' : `Found ${httpResources.length} HTTP resources`,
      details: httpResources.length > 0 ? Array.from(httpResources).map(el => el.getAttribute('src') || el.getAttribute('href')).join(', ') : undefined
    });

    // Check external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    const suspiciousLinks = Array.from(externalLinks).filter(link => {
      const href = link.getAttribute('href') || '';
      return href.includes('bit.ly') || href.includes('tinyurl') || href.includes('.tk') || href.includes('.ml');
    });
    
    updatedChecks.push({
      name: 'External Links',
      status: suspiciousLinks.length === 0 ? 'pass' : 'warning',
      message: suspiciousLinks.length === 0 ? 'No suspicious external links' : `Found ${suspiciousLinks.length} potentially suspicious links`,
      details: suspiciousLinks.length > 0 ? suspiciousLinks.map(link => link.getAttribute('href')).join(', ') : undefined
    });

    // Check script sources
    const scripts = document.querySelectorAll('script[src]');
    const externalScripts = Array.from(scripts).filter(script => {
      const src = script.getAttribute('src') || '';
      return src.startsWith('http') && !src.includes(window.location.hostname);
    });

    updatedChecks.push({
      name: 'Script Sources',
      status: 'pass',
      message: `Found ${externalScripts.length} external scripts`,
      details: externalScripts.map(script => script.getAttribute('src')).join(', ')
    });

    // Check CSP (basic check)
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    updatedChecks.push({
      name: 'Content Security Policy',
      status: cspMeta ? 'pass' : 'warning',
      message: cspMeta ? 'CSP meta tag found' : 'No CSP meta tag found',
      details: cspMeta ? cspMeta.getAttribute('content') : 'Consider adding Content-Security-Policy'
    });

    // Google Safe Browsing status
    updatedChecks.push({
      name: 'Google Safe Browsing',
      status: 'fail',
      message: 'Site flagged by Google Safe Browsing',
      details: 'This is the root cause of the Chrome warning. Check Google Search Console for details.'
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Security Audit - Chrome "Dangerous" Warning Investigation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-red-700">Critical Issue Detected</span>
            </div>
            <p className="text-red-600 text-sm">
              Google Safe Browsing has flagged this site as containing harmful content. 
              This is causing Chrome to display the "Dangerous" warning.
            </p>
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
            <h3 className="font-semibold">Immediate Actions Required:</h3>
            <div className="space-y-2">
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
            <h4 className="font-semibold text-blue-700 mb-2">Next Steps:</h4>
            <ul className="text-blue-600 text-sm space-y-1">
              <li>1. Check Google Search Console for specific security issues</li>
              <li>2. Scan your hosting server for malware/compromised files</li>
              <li>3. Review all external links and embedded content</li>
              <li>4. Check for any suspicious redirects or injected content</li>
              <li>5. Submit a reconsideration request after fixing issues</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAudit;


import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const RhythmLabLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <div className="p-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-warm-brown hover:text-burnt-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      
      {/* Main content */}
      <Outlet />
    </div>
  );
};

export default RhythmLabLayout;

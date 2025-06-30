
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const ProblemButton: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Link to="/report">
      <Button
        variant="outline"
        className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all duration-200"
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        {t('common.problemButton')}
      </Button>
    </Link>
  );
};

export default ProblemButton;

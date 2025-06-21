
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface SeeAllAssignmentsButtonProps {
  /** The route to navigate to when the button is clicked */
  to: string;
  /** Optional custom text for the button (defaults to translated "All Assignments") */
  children?: React.ReactNode;
  /** Optional size variant */
  size?: 'default' | 'sm' | 'lg';
  /** Optional additional CSS classes */
  className?: string;
}

const SeeAllAssignmentsButton: React.FC<SeeAllAssignmentsButtonProps> = ({
  to,
  children,
  size = 'lg',
  className = ''
}) => {
  const { t } = useTranslation();

  return (
    <Link to={to}>
      <Button 
        size={size}
        className={`bg-golden-yellow hover:bg-golden-yellow/90 text-warm-brown font-semibold text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${className}`}
      >
        {children || t('common.allAssignments' as any)}
      </Button>
    </Link>
  );
};

export default SeeAllAssignmentsButton;

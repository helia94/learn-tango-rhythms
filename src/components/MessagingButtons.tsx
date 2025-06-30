
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Signal, Telegram, WhatsApp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface MessagingButtonsProps {
  phoneNumber: string;
}

const MessagingButtons: React.FC<MessagingButtonsProps> = ({ phoneNumber }) => {
  const { t } = useTranslation();
  
  const message = encodeURIComponent(t('report.messageTemplate'));
  const cleanPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/\+/g, '');

  const messagingLinks = [
    {
      name: 'SMS',
      icon: MessageSquare,
      url: `sms:${phoneNumber}?body=${message}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'WhatsApp',
      icon: WhatsApp,
      url: `https://wa.me/${cleanPhoneNumber}?text=${message}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Telegram',
      icon: Telegram,
      url: `https://t.me/share/url?url=&text=${message}`,
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    {
      name: 'Signal',
      icon: Signal,
      url: `https://signal.me/#/compose?text=${message}`,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      name: 'Threema',
      icon: MessageSquare,
      url: `threema://compose?text=${message}`,
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  const handleClick = (url: string, name: string) => {
    try {
      if (name === 'SMS') {
        window.location.href = url;
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error(`Failed to open ${name}:`, error);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-sm text-cream/80 mb-3">{t('report.messagingApps')}</p>
      <div className="grid grid-cols-2 gap-2">
        {messagingLinks.map((app) => {
          const IconComponent = app.icon;
          return (
            <Button
              key={app.name}
              onClick={() => handleClick(app.url, app.name)}
              variant="secondary"
              size="sm"
              className={`${app.color} text-white border-0 hover:scale-105 transition-all duration-200`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {app.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MessagingButtons;


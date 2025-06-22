
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export type Language = 'en' | 'de';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('de');
  const { profile, loading } = useAuth();

  // Update language when profile loads or changes
  useEffect(() => {
    if (!loading && profile?.preferred_language) {
      const preferredLang = profile.preferred_language as Language;
      if (preferredLang !== currentLanguage) {
        setCurrentLanguage(preferredLang);
        console.log(`Language set from profile preference: ${preferredLang}`);
      }
    }
  }, [profile, loading]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    console.log(`Language switched to: ${language}`);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

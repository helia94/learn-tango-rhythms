
import { useLanguageContext } from '@/contexts/LanguageContext';
import { translations, TranslationKey } from '@/data/translations/index';

export const useTranslation = () => {
  const { currentLanguage } = useLanguageContext();

  const t = (key: TranslationKey): string => {
    try {
      // Split the key by dots to navigate nested object
      const keys = key.split('.');
      let value: any = translations;
      
      // Navigate through the nested structure
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key} - failed at segment: ${k}`);
          return key; // Return the key itself if translation not found
        }
      }
      
      // Check if we have a translation object with the current language
      if (value && typeof value === 'object' && currentLanguage in value) {
        const translatedValue = value[currentLanguage];
        return translatedValue;
      }
      
      console.warn(`Translation not found for key: ${key}, language: ${currentLanguage}`);
      return key; // Return the key itself if translation not found
    } catch (error) {
      console.error(`Error translating key: ${key}`, error);
      return key;
    }
  };

  return { t, currentLanguage };
};

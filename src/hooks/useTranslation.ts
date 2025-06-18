
import { useLanguageContext } from '@/contexts/LanguageContext';
import { translations, TranslationKey } from '@/data/translations';

export const useTranslation = (context?: string) => {
  const { currentLanguage } = useLanguageContext();

  const t = (key: TranslationKey): string => {
    try {
      // Add debugging
      console.log(`Translating key: ${key} for language: ${currentLanguage}, context: ${context || 'none'}`);
      
      // Split the key by dots to navigate nested object
      const keys = key.split('.');
      let value: any = translations;
      
      // If context is provided and we're looking for daily content, try context-specific key first
      if (context && keys[0] === 'daily' && keys.length >= 3) {
        const contextKey = `${keys[0]}.${context}.${keys.slice(1).join('.')}`;
        const contextKeys = contextKey.split('.');
        let contextValue: any = translations;
        
        // Try to navigate through context-specific path
        let contextFound = true;
        for (const k of contextKeys) {
          if (contextValue && typeof contextValue === 'object' && k in contextValue) {
            contextValue = contextValue[k];
          } else {
            contextFound = false;
            break;
          }
        }
        
        // If context-specific translation found, use it
        if (contextFound && contextValue && typeof contextValue === 'object' && currentLanguage in contextValue) {
          const translatedValue = contextValue[currentLanguage];
          console.log(`Successfully translated "${key}" with context "${context}" to: "${translatedValue}"`);
          return translatedValue;
        }
      }
      
      // Navigate through the nested structure (fallback to original behavior)
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
        console.log(`Successfully translated "${key}" to: "${translatedValue}"`);
        return translatedValue;
      }
      
      console.warn(`Translation not found for key: ${key}, language: ${currentLanguage}`);
      console.log('Available languages for this key:', value ? Object.keys(value) : 'none');
      return key; // Return the key itself if translation not found
    } catch (error) {
      console.error(`Error translating key: ${key}`, error);
      return key;
    }
  };

  return { t, currentLanguage };
};

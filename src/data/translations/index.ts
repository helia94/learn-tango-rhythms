
import { otherTranslations } from './other';
import { fastAndSlowTranslations } from './topics/fast_and_slow';
import { smallAndBigTranslations } from './topics/small_and_big';
import { profileTranslations } from './profile';

// Helper function to merge nested translation objects
const mergeTranslations = (...translationObjects: any[]) => {
  const result: any = {};
  
  for (const translations of translationObjects) {
    for (const [key, value] of Object.entries(translations)) {
      if (result[key] && typeof result[key] === 'object' && typeof value === 'object') {
        // Deep merge for nested objects
        result[key] = { ...result[key], ...value };
      } else {
        result[key] = value;
      }
    }
  }
  
  return result;
};

// Combine all translations
export const translations = mergeTranslations(
  otherTranslations,
  fastAndSlowTranslations,
  smallAndBigTranslations,
  profileTranslations
);

// Generate the type for all possible translation keys
type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? T[K] extends { en: any; de: any }
            ? K
            : `${K}.${DeepKeys<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKey = DeepKeys<typeof translations>;

// Export individual translation modules for potential direct use
export { otherTranslations, fastAndSlowTranslations, smallAndBigTranslations, profileTranslations };


import { otherTranslations } from './other';
import { profileTranslations } from './profile';

// Combine all translations
export const translations = {
  ...otherTranslations,
  ...profileTranslations
};

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
export { otherTranslations, profileTranslations };

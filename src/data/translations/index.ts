
import { translations as mainTranslations, TranslationKey as MainTranslationKey } from './translations';
import { otherTranslations } from './other';
import { homeTranslations } from './home';
import { mergeTranslations } from '@/utils/mergeTranslations';

// Export the main TranslationKey type and extend it with home keys
export type TranslationKey = MainTranslationKey | 
  `home.hero.title` | `home.hero.subtitle` | `home.hero.tagline` |
  `home.about.title` | `home.about.description` |
  `home.buttons.roadMap` | `home.buttons.profile` | `home.buttons.login` | `home.buttons.rhythmLab` |
  `home.description.title` | `home.description.getTopicWeek` | `home.description.trackProgress` | 
  `home.description.buildingContrast` | `home.description.exampleTopics` |
  `home.accordion.why.title` | `home.accordion.why.reason1` | `home.accordion.why.reason2` | `home.accordion.why.reason3` |
  `home.accordion.pricing.title` | `home.accordion.pricing.content` |
  `home.accordion.concept.title` | `home.accordion.concept.content` |
  `home.accordion.credits.title` | `home.accordion.credits.intro` | `home.accordion.credits.teachers` |
  `home.footer.copyright` | `home.footer.terms` | `home.footer.privacy` | `home.footer.contact`;

export const translations = mergeTranslations([
  mainTranslations,
  otherTranslations,
  { home: homeTranslations }
]);

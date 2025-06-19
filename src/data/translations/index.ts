
import { translations as mainTranslations, TranslationKey as MainTranslationKey } from './translations';
import { otherTranslations } from './other';
import { homeTranslations } from './home';
import { deepMergeTranslations } from '@/utils/mergeTranslations';

// Export the main TranslationKey type and extend it with home keys and missing exercise keys
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
  `home.footer.copyright` | `home.footer.terms` | `home.footer.privacy` | `home.footer.contact` |
  // Add missing small and big dancing exercise keys
  `exercises.dancingSmallBig.daily.day1.content` | `exercises.dancingSmallBig.daily.day1.task` |
  `exercises.dancingSmallBig.daily.day2.content` | `exercises.dancingSmallBig.daily.day2.task` |
  `exercises.dancingSmallBig.daily.day3.content` | `exercises.dancingSmallBig.daily.day3.task` |
  `exercises.dancingSmallBig.daily.day4.content` | `exercises.dancingSmallBig.daily.day4.task` |
  `exercises.dancingSmallBig.daily.day5.content` | `exercises.dancingSmallBig.daily.day5.task` |
  `exercises.dancingSmallBig.daily.day6.content` | `exercises.dancingSmallBig.daily.day6.task` |
  `exercises.dancingSmallBig.daily.day7.content` | `exercises.dancingSmallBig.daily.day7.task` |
  `exercises.dancingSmallBig.assignment1` | `exercises.dancingSmallBig.assignment2` | `exercises.dancingSmallBig.assignment3`;

export const translations = deepMergeTranslations(
  mainTranslations,
  otherTranslations,
  { home: homeTranslations }
);

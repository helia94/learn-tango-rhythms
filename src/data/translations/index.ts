
import { commonTranslations } from './ui/common';
import { progressTranslations } from './ui/progress';
import { roadmapTranslations } from './pages/roadmap';
import { profileTranslations } from './pages/profile';
import { rhythmTranslations } from './pages/rhythm';
import { quizTranslations } from './pages/quiz';
import { leaderboardTranslations } from './pages/leaderboard';
import { notFoundTranslations } from './pages/notFound';
import { conceptsTranslations } from './concepts/concepts';
import { fastAndSlowTranslations } from './exercises/fastAndSlow';
import { dailyTranslations } from './exercises/daily';
import { tipsTranslations } from './exercises/tips';

export const translations = {
  common: commonTranslations,
  progress: progressTranslations,
  roadmap: roadmapTranslations,
  leaderboard: leaderboardTranslations,
  rhythm: rhythmTranslations,
  quiz: quizTranslations,
  notFound: notFoundTranslations,
  concepts: conceptsTranslations,
  exercises: {
    dancingFastSlow: fastAndSlowTranslations
  },
  daily: dailyTranslations,
  tips: tipsTranslations
};

// Helper type to generate all possible nested keys from an object
type NestedKeys<T> = T extends object ? {
  [K in keyof T]: K extends string 
    ? T[K] extends object 
      ? `${K}.${NestedKeys<T[K]>}` | K
      : K
    : never
}[keyof T] : never;

// Export all translation keys - now properly includes all nested keys
export type TranslationKey = 
  | NestedKeys<typeof commonTranslations>
  | `common.${NestedKeys<typeof commonTranslations>}`
  | NestedKeys<typeof progressTranslations>
  | `progress.${NestedKeys<typeof progressTranslations>}`
  | NestedKeys<typeof roadmapTranslations>
  | `roadmap.${NestedKeys<typeof roadmapTranslations>}`
  | NestedKeys<typeof leaderboardTranslations>
  | `leaderboard.${NestedKeys<typeof leaderboardTranslations>}`
  | NestedKeys<typeof rhythmTranslations>
  | `rhythm.${NestedKeys<typeof rhythmTranslations>}`
  | NestedKeys<typeof quizTranslations>
  | `quiz.${NestedKeys<typeof quizTranslations>}`
  | NestedKeys<typeof notFoundTranslations>
  | `notFound.${NestedKeys<typeof notFoundTranslations>}`
  | NestedKeys<typeof conceptsTranslations>
  | `concepts.${NestedKeys<typeof conceptsTranslations>}`
  | NestedKeys<typeof fastAndSlowTranslations>
  | `exercises.dancingFastSlow.${NestedKeys<typeof fastAndSlowTranslations>}`
  | NestedKeys<typeof dailyTranslations>
  | `daily.${NestedKeys<typeof dailyTranslations>}`
  | NestedKeys<typeof tipsTranslations>
  | `tips.${NestedKeys<typeof tipsTranslations>}`;

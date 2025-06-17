
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

// Export all translation keys
export type TranslationKey = 
  | `common.${keyof typeof commonTranslations}`
  | `progress.${keyof typeof progressTranslations}`
  | `roadmap.${keyof typeof roadmapTranslations}`
  | `leaderboard.${keyof typeof leaderboardTranslations}`
  | `rhythm.${keyof typeof rhythmTranslations}`
  | `quiz.${keyof typeof quizTranslations}`
  | `notFound.${keyof typeof notFoundTranslations}`
  | `concepts.${keyof typeof conceptsTranslations}`
  | `exercises.dancingFastSlow.${keyof typeof fastAndSlowTranslations}`
  | `daily.${keyof typeof dailyTranslations}`
  | `tips.${keyof typeof tipsTranslations}`;

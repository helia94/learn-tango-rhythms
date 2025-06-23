
import { translations as mainTranslations, TranslationKey as MainTranslationKey } from './translations';
import { otherTranslations } from './other';
import { homeTranslations } from './home';
import { profileTranslations } from './profile';
import { smallAndBigTranslations } from './small_and_big';
import { dancingHighLowTranslations } from './dancing_high_low';
import { dancingCircularLinearTranslations } from './dancing_circular_linear';
import { dancingWithWithoutControlTranslations } from './dancing_with_without_control';
import { adminTranslations } from './admin';
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
  // Profile translation keys
  `profile.title` | `profile.subtitle` | `profile.back` | `profile.rhythmLab` | `profile.roadMap` |
  `profile.sections.username` | `profile.sections.fullName` | `profile.sections.bio` | `profile.sections.memberSince` |
  `profile.sections.preferredLanguage` |
  `profile.sections.edit` | `profile.sections.cancel` | `profile.sections.signOut` | `profile.sections.saveChanges` | `profile.sections.saving` |
  `profile.sections.placeholders.fullName` | `profile.sections.placeholders.username` | `profile.sections.placeholders.bio` |
  `profile.sections.messages.profileUpdated` | `profile.sections.messages.usernameTaken` | `profile.sections.messages.updateFailed` |
  `profile.sections.messages.unexpectedError` | `profile.sections.messages.signedOut` | `profile.sections.messages.signOutFailed` |
  // Profile dashboard keys
  `profile.dashboard.topicMastery` | `profile.dashboard.dailyStreak` | `profile.dashboard.weeklyStreak` | `profile.dashboard.best` |
  `profile.dashboard.assignmentsDone` | `profile.dashboard.monthlyActivity` | `profile.dashboard.activityLess` | `profile.dashboard.activityMore` |
  `profile.dashboard.noTopicsActivated` | `profile.dashboard.assignmentsCompleted` | `profile.dashboard.keepGoing` | `profile.dashboard.keepGoingShort` |
  // Profile spotify keys
  `profile.spotify.title` | `profile.spotify.connected` | `profile.spotify.notConnected` | `profile.spotify.premiumEnabled` |
  `profile.spotify.premiumRequired` | `profile.spotify.disconnect` | `profile.spotify.connectPremium` | `profile.spotify.connecting` |
  // Add missing small and big dancing exercise keys
  `exercises.dancingSmallBig.daily.day1.content` | `exercises.dancingSmallBig.daily.day1.task` |
  `exercises.dancingSmallBig.daily.day2.content` | `exercises.dancingSmallBig.daily.day2.task` |
  `exercises.dancingSmallBig.daily.day3.content` | `exercises.dancingSmallBig.daily.day3.task` |
  `exercises.dancingSmallBig.daily.day4.content` | `exercises.dancingSmallBig.daily.day4.task` |
  `exercises.dancingSmallBig.daily.day5.content` | `exercises.dancingSmallBig.daily.day5.task` |
  `exercises.dancingSmallBig.daily.day6.content` | `exercises.dancingSmallBig.daily.day6.task` |
  `exercises.dancingSmallBig.daily.day7.content` | `exercises.dancingSmallBig.daily.day7.task` |
  `exercises.dancingSmallBig.assignment1` | `exercises.dancingSmallBig.assignment2` | `exercises.dancingSmallBig.assignment3` |
  // Add new dancing high low exercise keys
  `exercises.dancingHighLow.title` | `exercises.dancingHighLow.introText1` | `exercises.dancingHighLow.introText2` |
  `exercises.dancingHighLow.tipsTitle` | `exercises.dancingHighLow.tip1` | `exercises.dancingHighLow.tip2` | `exercises.dancingHighLow.tip3` | `exercises.dancingHighLow.tip4` |
  `exercises.dancingHighLow.musicalConnectionTitle` | `exercises.dancingHighLow.musicalConnectionText1` | `exercises.dancingHighLow.musicalConnectionText2` | `exercises.dancingHighLow.musicalConnectionText3` |
  `exercises.dancingHighLow.practiceTitle` | `exercises.dancingHighLow.practiceDescription` |
  `exercises.dancingHighLow.volumeExampleTitle` | `exercises.dancingHighLow.pitchExampleTitle` |
  `exercises.dancingHighLow.allAssignments` | `exercises.dancingHighLow.assignmentsDescription` |
  `exercises.dancingHighLow.daily.day1.content` | `exercises.dancingHighLow.daily.day1.task` |
  `exercises.dancingHighLow.daily.day2.content` | `exercises.dancingHighLow.daily.day2.task` |
  `exercises.dancingHighLow.daily.day3.content` | `exercises.dancingHighLow.daily.day3.task` |
  `exercises.dancingHighLow.daily.day4.content` | `exercises.dancingHighLow.daily.day4.task` |
  `exercises.dancingHighLow.daily.day5.content` | `exercises.dancingHighLow.daily.day5.task` |
  `exercises.dancingHighLow.daily.day6.content` | `exercises.dancingHighLow.daily.day6.task` |
  `exercises.dancingHighLow.daily.day7.content` | `exercises.dancingHighLow.daily.day7.task` |
  `exercises.dancingHighLow.assignment1` | `exercises.dancingHighLow.assignment2` | `exercises.dancingHighLow.assignment3` | `exercises.dancingHighLow.assignment4` |
  // Add new dancing circular linear exercise keys
  `exercises.dancingCircularLinear.title` | `exercises.dancingCircularLinear.introText1` | `exercises.dancingCircularLinear.introText2` |
  `exercises.dancingCircularLinear.musicalConnectionTitle` | `exercises.dancingCircularLinear.musicalConnectionText1` |
  `exercises.dancingCircularLinear.allAssignments` | `exercises.dancingCircularLinear.assignmentsDescription` |
  `exercises.dancingCircularLinear.assignment1` | `exercises.dancingCircularLinear.assignment2` |
  `exercises.dancingCircularLinear.daily.day1.content` | `exercises.dancingCircularLinear.daily.day1.task` |
  `exercises.dancingCircularLinear.daily.day2.content` | `exercises.dancingCircularLinear.daily.day2.task` |
  `exercises.dancingCircularLinear.daily.day3.content` | `exercises.dancingCircularLinear.daily.day3.task` |
  // Add new dancing with without control exercise keys
  `exercises.dancingWithWithoutControl.title` | `exercises.dancingWithWithoutControl.introText1` | `exercises.dancingWithWithoutControl.introText2` | `exercises.dancingWithWithoutControl.introText3` |
  `exercises.dancingWithWithoutControl.musicalConnectionTitle` | `exercises.dancingWithWithoutControl.musicalConnectionText1` |
  `exercises.dancingWithWithoutControl.allAssignments` | `exercises.dancingWithWithoutControl.assignmentsDescription` |
  `exercises.dancingWithWithoutControl.assignment1` | `exercises.dancingWithWithoutControl.assignment2` |
  `exercises.dancingWithWithoutControl.daily.day1.content` | `exercises.dancingWithWithoutControl.daily.day1.task` |
  `exercises.dancingWithWithoutControl.daily.day2.content` | `exercises.dancingWithWithoutControl.daily.day2.task` |
  `exercises.dancingWithWithoutControl.daily.day3.content` | `exercises.dancingWithWithoutControl.daily.day3.task` |
  `exercises.dancingWithWithoutControl.daily.day4.content` | `exercises.dancingWithWithoutControl.daily.day4.task` |
  // Add missing daily translation keys
  `daily.dayNotFound` | `daily.topicNotFound` |
  // Add admin translation keys
  `admin.controls` | `admin.unlockAllDescription` | `admin.activateUnlockAll` | `admin.deactivateUnlockAll` |
  `admin.processing` | `admin.unlockAllActiveWarning` |
  // Add common availableOn and signInToUnlock translation keys
  `common.availableOn` | `common.signInToUnlock`;

export const translations = deepMergeTranslations(
  mainTranslations,
  otherTranslations,
  { home: homeTranslations },
  profileTranslations,
  smallAndBigTranslations,
  dancingHighLowTranslations,
  dancingCircularLinearTranslations,
  dancingWithWithoutControlTranslations,
  adminTranslations
);

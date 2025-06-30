import { commonTranslations } from './common';
import { navigationTranslations } from './navigation';
import { interactiveTranslations } from './interactive';
import { conceptsTranslations } from './concepts';
import { exercisesTranslations } from './exercises';
import { learningTranslations } from './learning';
import { otherTranslations } from './other';
import { homeTranslations } from './home';
import { profileTranslations } from './profile';
import { smallAndBigTranslations } from './small_and_big';
import { dancingHighLowTranslations } from './dancing_high_low';
import { dancingCircularLinearTranslations } from './dancing_circular_linear';
import { dancingWithWithoutControlTranslations } from './dancing_with_without_control';
import { adminTranslations } from './admin';
import { deepMergeTranslations } from '@/utils/mergeTranslations';

// Consolidated TranslationKey type including all translation keys
export type TranslationKey = 
  // Common translations
  | 'common.backToHome'
  | 'common.backToRoadmap'
  | 'common.play'
  | 'common.pause'
  | 'common.clear'
  | 'common.speed'
  | 'common.error'
  | 'common.success'
  | 'common.skip'
  | 'common.loading'
  | 'common.startThisTopic'
  | 'common.loginToStart'
  | 'common.signInToUnlockDaily'
  | 'common.signInToTrackProgress'
  | 'common.allAssignments'
  | 'common.availableOn'
  | 'common.spotifyConnect'
  | 'common.connectSpotifyPremium'
  | 'common.videoGuideComingSoon'
  | 'common.problemButton'
  // Report translations
  | 'report.title'
  | 'report.subtitle'
  | 'report.description'
  | 'report.emailTitle'
  | 'report.phoneTitle'
  | 'report.messageTemplate'
  | 'report.messagingApps'
  // Navigation translations
  | 'roadmap.title'
  | 'leaderboard.viewLeaderboard'
  // Interactive translations
  | 'rhythm.title'
  | 'rhythm.subtitle'
  | 'rhythm.instructions'
  | 'rhythm.presets'
  | 'quiz.takeQuiz'
  | 'quiz.complete'
  | 'quiz.finalScore'
  | 'quiz.complete_percentage'
  | 'quiz.yourName'
  | 'quiz.enterName'
  | 'quiz.city'
  | 'quiz.enterCity'
  | 'quiz.submitting'
  | 'quiz.submitScore'
  // Error and message translations
  | 'errors.enterName'
  | 'errors.submitFailed'
  | 'messages.scoreSubmitted'
  // Not found translations
  | 'notFound.title'
  | 'notFound.message'
  | 'notFound.returnHome'
  // Concepts translations
  | 'concepts.dancingFastVsSlow'
  | 'concepts.dancingSmallVsBig'
  | 'concepts.dancingHighVsLow'
  | 'concepts.dancingCircularVsLinear'
  | 'concepts.withControlVsWithoutControl'
  | 'concepts.fullWeightTransferVsRebounds'
  | 'concepts.expandingVsShrinking'
  | 'concepts.highBodyTensionVsLowBodyTension'
  | 'concepts.feetAlwaysOnFloorVsFeetOffFloor'
  | 'concepts.pushingFloorVsNotPushingFloor'
  | 'concepts.leadingEveryStepVsNotLeadingEveryStep'
  | 'concepts.sameStepsVsDifferentSteps'
  | 'concepts.fewStepsVsManySteps'
  | 'concepts.dancingRhythmVsDancingMelody'
  | 'concepts.facingPartnerVsTurningAway'
  | 'concepts.acceleratingVsDecelerating'
  | 'concepts.dancingRubato'
  | 'concepts.marcatoIn2VsIn4'
  | 'concepts.normalSyncopa'
  | 'concepts.doubleSyncopa'
  | 'concepts.dragSyncopa'
  | 'concepts.dance4To1'
  | 'concepts.danceTriplets'
  | 'concepts.danceLikeJellyfish'
  | 'concepts.danceLikeWater'
  | 'concepts.danceLikeSculptures'
  | 'concepts.danceTheAccents'
  // Exercise translations - Dancing Fast Slow
  | 'exercises.dancingFastSlow.title'
  | 'exercises.dancingFastSlow.introText1'
  | 'exercises.dancingFastSlow.introText2'
  | 'exercises.dancingFastSlow.letStartSimple'
  | 'exercises.dancingFastSlow.simpleText1'
  | 'exercises.dancingFastSlow.typicalStrongBeat'
  | 'exercises.dancingFastSlow.couldNotFindBeat'
  | 'exercises.dancingFastSlow.threeSpeeds'
  | 'exercises.dancingFastSlow.threeSpeedsText'
  | 'exercises.dancingFastSlow.halfSpeed'
  | 'exercises.dancingFastSlow.normalSpeed'
  | 'exercises.dancingFastSlow.doubleSpeed'
  | 'exercises.dancingFastSlow.fullSongText'
  | 'exercises.dancingFastSlow.practicedWalking'
  | 'exercises.dancingFastSlow.musicSpeedChanges'
  | 'exercises.dancingFastSlow.musicSpeedChangesText'
  | 'exercises.dancingFastSlow.rhythmChanges'
  | 'exercises.dancingFastSlow.rhythmChangesText'
  | 'exercises.dancingFastSlow.from2To4Beats'
  | 'exercises.dancingFastSlow.from4To2Beats'
  | 'exercises.dancingFastSlow.melodyChanges'
  | 'exercises.dancingFastSlow.melodyChangesText'
  | 'exercises.dancingFastSlow.legatoToStaccato'
  | 'exercises.dancingFastSlow.staccatoToLegato'
  | 'exercises.dancingFastSlow.weeklyAssignment'
  | 'exercises.dancingFastSlow.assignment1'
  | 'exercises.dancingFastSlow.assignment2'
  | 'exercises.dancingFastSlow.assignment3'
  | 'exercises.dancingFastSlow.assignment4'
  | 'exercises.dancingFastSlow.practiceSongs'
  | 'exercises.dancingFastSlow.practiceSongsText'
  | 'exercises.dancingFastSlow.songs1And2'
  | 'exercises.dancingFastSlow.songs1And2Text'
  | 'exercises.dancingFastSlow.songs3And4'
  | 'exercises.dancingFastSlow.songs3And4Text'
  | 'exercises.dancingFastSlow.songs5And6'
  | 'exercises.dancingFastSlow.songs5And6Text'
  | 'exercises.dancingFastSlow.commentsTitle'
  | 'exercises.dancingFastSlow.commentsPlaceholder'
  | 'exercises.dancingFastSlow.rateTitle'
  | 'exercises.dancingFastSlow.ratePlaceholder'
  | 'exercises.dancingFastSlow.allAssignments'
  | 'exercises.dancingFastSlow.assignmentsDescription'
  | 'exercises.dancingFastSlow.weeklyAssignments'
  | 'exercises.dancingFastSlow.seeAllAssignments'
  | 'exercises.dancingFastSlow.daily.title'
  | 'exercises.dancingFastSlow.daily.subtitle'
  | 'exercises.dancingFastSlow.daily.unlockDay'
  | 'exercises.dancingFastSlow.daily.unlockTomorrow'
  | 'exercises.dancingFastSlow.daily.locked'
  | 'exercises.dancingFastSlow.daily.availableTomorrow'
  | 'exercises.dancingFastSlow.daily.day1.content'
  | 'exercises.dancingFastSlow.daily.day1.audioTitle'
  | 'exercises.dancingFastSlow.daily.day1.audioDescription'
  | 'exercises.dancingFastSlow.daily.day1.fullSong'
  | 'exercises.dancingFastSlow.daily.day1.task'
  | 'exercises.dancingFastSlow.daily.day2.content'
  | 'exercises.dancingFastSlow.daily.day2.description'
  | 'exercises.dancingFastSlow.daily.day2.bandonionSolos'
  | 'exercises.dancingFastSlow.daily.day2.violinSolos'
  | 'exercises.dancingFastSlow.daily.day2.singerSolo'
  | 'exercises.dancingFastSlow.daily.day2.task'
  | 'exercises.dancingFastSlow.daily.day3.content'
  | 'exercises.dancingFastSlow.daily.day3.description'
  | 'exercises.dancingFastSlow.daily.day3.task'
  | 'exercises.dancingFastSlow.daily.day4.content'
  | 'exercises.dancingFastSlow.daily.day4.description'
  | 'exercises.dancingFastSlow.daily.day4.task'
  | 'exercises.dancingFastSlow.daily.day5.content'
  | 'exercises.dancingFastSlow.daily.day5.task'
  | 'exercises.dancingFastSlow.daily.day6.content'
  | 'exercises.dancingFastSlow.daily.day6.task'
  | 'exercises.dancingFastSlow.daily.day7.content'
  | 'exercises.dancingFastSlow.daily.day7.task'
  | 'exercises.dancingFastSlow.daily.placeholder'
  | 'exercises.dancingFastSlow.daily.placeholderTask'
  | 'exercises.dancingFastSlow.tips.extremeSlowness'
  | 'exercises.dancingFastSlow.tips.extremeSlownessTip1'
  | 'exercises.dancingFastSlow.tips.extremeSlownessTip2'
  | 'exercises.dancingFastSlow.tips.extremeSlownessTip3'
  | 'exercises.dancingFastSlow.tips.extremeSlownessTip4'
  | 'exercises.dancingFastSlow.tips.extremeSpeed'
  | 'exercises.dancingFastSlow.tips.extremeSpeedTip1'
  | 'exercises.dancingFastSlow.tips.extremeSpeedTip2'
  | 'exercises.dancingFastSlow.tips.backOchoChallenge'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTitle'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTip1'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTip2'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTip3'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTip4'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallenge'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTitle'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip1'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip2'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip3'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip4'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip5'
  // Learning translations - Daily
  | 'daily.title'
  | 'daily.subtitle'
  | 'daily.unlockDay'
  | 'daily.unlockTomorrow'
  | 'daily.locked'
  | 'daily.availableTomorrow'
  | 'daily.placeholder'
  | 'daily.placeholderTask'
  | 'daily.dayNotFound'
  | 'daily.topicNotFound'
  // Learning translations - Progress
  | 'progress.trackingTitle'
  | 'progress.levelInfo'
  | 'progress.notStarted'
  | 'progress.notStartedDesc'
  | 'progress.firstAttempt'
  | 'progress.firstAttemptDesc'
  | 'progress.practiceMode'
  | 'progress.practiceModeDesc'
  | 'progress.gettingThere'
  | 'progress.gettingThereDesc'
  | 'progress.mastered'
  | 'progress.masteredDesc'
  // Home translation keys
  | `home.hero.title` | `home.hero.subtitle` | `home.hero.tagline`
  | `home.about.title` | `home.about.description`
  | `home.buttons.roadMap` | `home.buttons.profile` | `home.buttons.login` | `home.buttons.rhythmLab`
  | `home.description.title` | `home.description.getTopicWeek` | `home.description.trackProgress` 
  | `home.description.buildingContrast` | `home.description.exampleTopics`
  | `home.accordion.why.title` | `home.accordion.why.reason1` | `home.accordion.why.reason2` | `home.accordion.why.reason3`
  | `home.accordion.pricing.title` | `home.accordion.pricing.content`
  | `home.accordion.forLeaders.title` | `home.accordion.forLeaders.content`
  | `home.accordion.concept.title` | `home.accordion.concept.content`
  | `home.accordion.credits.title` | `home.accordion.credits.intro` | `home.accordion.credits.teachers`
  | `home.footer.copyright` | `home.footer.terms` | `home.footer.privacy` | `home.footer.contact`
  // Profile translation keys
  | `profile.title` | `profile.subtitle` | `profile.back` | `profile.rhythmLab` | `profile.roadMap`
  | `profile.sections.username` | `profile.sections.fullName` | `profile.sections.bio` | `profile.sections.memberSince`
  | `profile.sections.preferredLanguage`
  | `profile.sections.edit` | `profile.sections.cancel` | `profile.sections.signOut` | `profile.sections.saveChanges` | `profile.sections.saving`
  | `profile.sections.placeholders.fullName` | `profile.sections.placeholders.username` | `profile.sections.placeholders.bio`
  | `profile.sections.messages.profileUpdated` | `profile.sections.messages.usernameTaken` | `profile.sections.messages.updateFailed`
  | `profile.sections.messages.unexpectedError` | `profile.sections.messages.signedOut` | `profile.sections.messages.signOutFailed`
  // Profile dashboard keys
  | `profile.dashboard.topicMastery` | `profile.dashboard.dailyStreak` | `profile.dashboard.weeklyStreak` | `profile.dashboard.best`
  | `profile.dashboard.assignmentsDone` | `profile.dashboard.monthlyActivity` | `profile.dashboard.activityLess` | `profile.dashboard.activityMore`
  | `profile.dashboard.noTopicsActivated` | `profile.dashboard.assignmentsCompleted` | `profile.dashboard.keepGoing` | `profile.dashboard.keepGoingShort`
  // Profile spotify keys
  | `profile.spotify.title` | `profile.spotify.connected` | `profile.spotify.notConnected` | `profile.spotify.premiumEnabled`
  | `profile.spotify.premiumRequired` | `profile.spotify.disconnect` | `profile.spotify.connectPremium` | `profile.spotify.connecting`
  // Small and big dancing exercise keys
  | `exercises.dancingSmallBig.daily.day1.content` | `exercises.dancingSmallBig.daily.day1.task`
  | `exercises.dancingSmallBig.daily.day2.content` | `exercises.dancingSmallBig.daily.day2.task`
  | `exercises.dancingSmallBig.daily.day3.content` | `exercises.dancingSmallBig.daily.day3.task`
  | `exercises.dancingSmallBig.daily.day4.content` | `exercises.dancingSmallBig.daily.day4.task`
  | `exercises.dancingSmallBig.daily.day5.content` | `exercises.dancingSmallBig.daily.day5.task`
  | `exercises.dancingSmallBig.daily.day6.content` | `exercises.dancingSmallBig.daily.day6.task`
  | `exercises.dancingSmallBig.daily.day7.content` | `exercises.dancingSmallBig.daily.day7.task`
  | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.title`
  | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.fastSmall.title` | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.fastSmall.description`
  | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.fastBig.title` | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.fastBig.description`
  | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.slowSmall.title` | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.slowSmall.description`
  | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.slowBig.title` | `exercises.dancingSmallBig.daily.day5.speedSizeMatrix.slowBig.description`
  | `exercises.dancingSmallBig.daily.day7.bridgeExample.title` | `exercises.dancingSmallBig.daily.day7.bridgeExample.description`
  | `exercises.dancingSmallBig.assignment1` | `exercises.dancingSmallBig.assignment2` | `exercises.dancingSmallBig.assignment3`
  // Dancing high low exercise keys
  | `exercises.dancingHighLow.title` | `exercises.dancingHighLow.introText1` | `exercises.dancingHighLow.introText2`
  | `exercises.dancingHighLow.tipsTitle` | `exercises.dancingHighLow.tip1` | `exercises.dancingHighLow.tip2` | `exercises.dancingHighLow.tip3` | `exercises.dancingHighLow.tip4`
  | `exercises.dancingHighLow.musicalConnectionTitle` | `exercises.dancingHighLow.musicalConnectionText1` | `exercises.dancingHighLow.musicalConnectionText2` | `exercises.dancingHighLow.musicalConnectionText3`
  | `exercises.dancingHighLow.practiceTitle` | `exercises.dancingHighLow.practiceDescription`
  | `exercises.dancingHighLow.volumeExampleTitle` | `exercises.dancingHighLow.pitchExampleTitle`
  | `exercises.dancingHighLow.allAssignments` | `exercises.dancingHighLow.assignmentsDescription`
  | `exercises.dancingHighLow.daily.day1.content` | `exercises.dancingHighLow.daily.day1.task`
  | `exercises.dancingHighLow.daily.day2.content` | `exercises.dancingHighLow.daily.day2.task`
  | `exercises.dancingHighLow.daily.day3.content` | `exercises.dancingHighLow.daily.day3.task`
  | `exercises.dancingHighLow.daily.day4.content` | `exercises.dancingHighLow.daily.day4.task`
  | `exercises.dancingHighLow.daily.day5.content` | `exercises.dancingHighLow.daily.day5.task`
  | `exercises.dancingHighLow.daily.day6.content` | `exercises.dancingHighLow.daily.day6.task`
  | `exercises.dancingHighLow.daily.day7.content` | `exercises.dancingHighLow.daily.day7.task`
  | `exercises.dancingHighLow.assignment1` | `exercises.dancingHighLow.assignment2` | `exercises.dancingHighLow.assignment3` | `exercises.dancingHighLow.assignment4`
  // Dancing circular linear exercise keys
  | `exercises.dancingCircularLinear.title` | `exercises.dancingCircularLinear.introText1` | `exercises.dancingCircularLinear.introText2`
  | `exercises.dancingCircularLinear.musicalConnectionTitle` | `exercises.dancingCircularLinear.musicalConnectionText1`
  | `exercises.dancingCircularLinear.allAssignments` | `exercises.dancingCircularLinear.assignmentsDescription`
  | `exercises.dancingCircularLinear.assignment1` | `exercises.dancingCircularLinear.assignment2`
  | `exercises.dancingCircularLinear.daily.day1.content` | `exercises.dancingCircularLinear.daily.day1.task`
  | `exercises.dancingCircularLinear.daily.day2.content` | `exercises.dancingCircularLinear.daily.day2.task`
  | `exercises.dancingCircularLinear.daily.day3.content` | `exercises.dancingCircularLinear.daily.day3.task`
  // Dancing with without control exercise keys
  | `exercises.dancingWithWithoutControl.title` | `exercises.dancingWithWithoutControl.introText1` | `exercises.dancingWithWithoutControl.introText2` | `exercises.dancingWithWithoutControl.introText3`
  | `exercises.dancingWithWithoutControl.musicalConnectionTitle` | `exercises.dancingWithWithoutControl.musicalConnectionText1`
  | `exercises.dancingWithWithoutControl.allAssignments` | `exercises.dancingWithWithoutControl.assignmentsDescription`
  | `exercises.dancingWithWithoutControl.assignment1` | `exercises.dancingWithWithoutControl.assignment2`
  | `exercises.dancingWithWithoutControl.daily.day1.content` | `exercises.dancingWithWithoutControl.daily.day1.task`
  | `exercises.dancingWithWithoutControl.daily.day2.content` | `exercises.dancingWithWithoutControl.daily.day2.task`
  | `exercises.dancingWithWithoutControl.daily.day3.content` | `exercises.dancingWithWithoutControl.daily.day3.task`
  | `exercises.dancingWithWithoutControl.daily.day4.content` | `exercises.dancingWithWithoutControl.daily.day4.task`
  // Admin translation keys
  | `admin.controls` | `admin.unlockAllDescription` | `admin.activateUnlockAll` | `admin.deactivateUnlockAll`
  | `admin.processing` | `admin.unlockAllActiveWarning`;

export const translations = deepMergeTranslations(
  commonTranslations,
  navigationTranslations,
  interactiveTranslations,
  conceptsTranslations,
  exercisesTranslations,
  learningTranslations,
  otherTranslations,
  { home: homeTranslations },
  profileTranslations,
  smallAndBigTranslations,
  dancingHighLowTranslations,
  dancingCircularLinearTranslations,
  dancingWithWithoutControlTranslations,
  adminTranslations
);

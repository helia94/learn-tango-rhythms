import { TranslationKey } from '@/data/translations/index';
import { TOPIC_CONFIG } from '@/config/topics';

export interface Concept {
  key: string;
  translationKey: TranslationKey;
  topicIndex?: number;
  link?: string;
}

// All concepts combined into one flowing sequence
export const allConcepts: Concept[] = [
  { 
    key: "dancingFastVsSlow", 
    translationKey: "concepts.dancingFastVsSlow", 
    topicIndex: TOPIC_CONFIG.DANCING_FAST_SLOW.index, 
    link: "/exercises/dancing-fast-slow" 
  },
  { 
    key: "dancingSmallVsBig", 
    translationKey: "concepts.dancingSmallVsBig", 
    topicIndex: TOPIC_CONFIG.DANCING_SMALL_BIG.index, 
    link: "/exercises/dancing-small-big" 
  },
  { 
    key: "dancingHighVsLow", 
    translationKey: "concepts.dancingHighVsLow", 
    topicIndex: TOPIC_CONFIG.DANCING_HIGH_LOW.index, 
    link: "/exercises/dancing-high-low" 
  },
  { 
    key: "dancingCircularVsLinear", 
    translationKey: "concepts.dancingCircularVsLinear", 
    topicIndex: TOPIC_CONFIG.DANCING_CIRCULAR_LINEAR.index, 
    link: "/exercises/dancing-circular-linear" 
  },
  { 
    key: "withControlVsWithoutControl", 
    translationKey: "concepts.withControlVsWithoutControl", 
    topicIndex: TOPIC_CONFIG.DANCING_WITH_WITHOUT_CONTROL.index, 
    link: "/exercises/dancing-with-without-control" 
  },
  { key: "fullWeightTransferVsRebounds", translationKey: "concepts.fullWeightTransferVsRebounds" },
  { key: "expandingVsShrinking", translationKey: "concepts.expandingVsShrinking" },
  { key: "highBodyTensionVsLowBodyTension", translationKey: "concepts.highBodyTensionVsLowBodyTension" },
  { key: "feetAlwaysOnFloorVsFeetOffFloor", translationKey: "concepts.feetAlwaysOnFloorVsFeetOffFloor" },
  { key: "pushingFloorVsNotPushingFloor", translationKey: "concepts.pushingFloorVsNotPushingFloor" },
  { key: "leadingEveryStepVsNotLeadingEveryStep", translationKey: "concepts.leadingEveryStepVsNotLeadingEveryStep" },
  { key: "sameStepsVsDifferentSteps", translationKey: "concepts.sameStepsVsDifferentSteps" },
  { key: "fewStepsVsManySteps", translationKey: "concepts.fewStepsVsManySteps" },
  { key: "dancingRhythmVsDancingMelody", translationKey: "concepts.dancingRhythmVsDancingMelody" },
  { key: "facingPartnerVsTurningAway", translationKey: "concepts.facingPartnerVsTurningAway" },
  { key: "acceleratingVsDecelerating", translationKey: "concepts.acceleratingVsDecelerating" },
  { key: "dancingRubato", translationKey: "concepts.dancingRubato" },
  { key: "marcatoIn2VsIn4", translationKey: "concepts.marcatoIn2VsIn4" },
  { key: "normalSyncopa", translationKey: "concepts.normalSyncopa" },
  { key: "doubleSyncopa", translationKey: "concepts.doubleSyncopa" },
  { key: "dragSyncopa", translationKey: "concepts.dragSyncopa" },
  { key: "dance4To1", translationKey: "concepts.dance4To1" },
  { key: "danceTriplets", translationKey: "concepts.danceTriplets" },
  { key: "danceLikeJellyfish", translationKey: "concepts.danceLikeJellyfish" },
  { key: "danceLikeWater", translationKey: "concepts.danceLikeWater" },
  { key: "danceLikeSculptures", translationKey: "concepts.danceLikeSculptures" },
  { key: "danceTheAccents", translationKey: "concepts.danceTheAccents" }
];


import { TranslationKey } from '@/data/translations/index';

export interface Concept {
  key: string;
  translationKey: TranslationKey;
  topicIndex?: number;
  link?: string;
}

// All concepts combined into one flowing sequence
export const allConcepts: Concept[] = [
  { key: "dancingFastVsSlow", translationKey: "concepts.dancingFastVsSlow", topicIndex: 0, link: "/exercises/dancing-fast-slow" },
  { key: "dancingSmallVsBig", translationKey: "concepts.dancingSmallVsBig", topicIndex: 1, link: "/exercises/dancing-small-big" },
  { key: "dancingHighVsLow", translationKey: "concepts.dancingHighVsLow", topicIndex: 2, link: "/exercises/dancing-high-low" },
  { key: "dancingCircularVsLinear", translationKey: "concepts.dancingCircularVsLinear", topicIndex: 3, link: "/exercises/dancing-circular-linear" },
  { key: "withControlVsWithoutControl", translationKey: "concepts.withControlVsWithoutControl", topicIndex: 4, link: "/exercises/dancing-with-without-control" },
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

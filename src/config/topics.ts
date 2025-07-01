
export const TOPIC_INDICES = {
  DANCING_FAST_SLOW: 0,
  DANCING_SMALL_BIG: 1,
  DANCING_HIGH_LOW: 2,
  DANCING_CIRCULAR_LINEAR: 3,
  DANCING_WITH_WITHOUT_CONTROL: 4,
} as const;

export const TOPIC_KEYS = {
  DANCING_FAST_SLOW: 'dancing-fast-slow',
  DANCING_SMALL_BIG: 'dancing-small-big',
  DANCING_HIGH_LOW: 'dancing-high-low',
  DANCING_CIRCULAR_LINEAR: 'dancing-circular-linear',
  DANCING_WITH_WITHOUT_CONTROL: 'dancing-with-without-control',
} as const;

export const TOPIC_TOTAL_DAYS = {
  DANCING_FAST_SLOW: 7,
  DANCING_SMALL_BIG: 7,
  DANCING_HIGH_LOW: 5,
  DANCING_CIRCULAR_LINEAR: 3,
  DANCING_WITH_WITHOUT_CONTROL: 4,
} as const;

// Complete topic configuration combining all properties
export const TOPIC_CONFIG = {
  DANCING_FAST_SLOW: {
    index: TOPIC_INDICES.DANCING_FAST_SLOW,
    key: TOPIC_KEYS.DANCING_FAST_SLOW,
    totalDays: TOPIC_TOTAL_DAYS.DANCING_FAST_SLOW,
  },
  DANCING_SMALL_BIG: {
    index: TOPIC_INDICES.DANCING_SMALL_BIG,
    key: TOPIC_KEYS.DANCING_SMALL_BIG,
    totalDays: TOPIC_TOTAL_DAYS.DANCING_SMALL_BIG,
  },
  DANCING_HIGH_LOW: {
    index: TOPIC_INDICES.DANCING_HIGH_LOW,
    key: TOPIC_KEYS.DANCING_HIGH_LOW,
    totalDays: TOPIC_TOTAL_DAYS.DANCING_HIGH_LOW,
  },
  DANCING_CIRCULAR_LINEAR: {
    index: TOPIC_INDICES.DANCING_CIRCULAR_LINEAR,
    key: TOPIC_KEYS.DANCING_CIRCULAR_LINEAR,
    totalDays: TOPIC_TOTAL_DAYS.DANCING_CIRCULAR_LINEAR,
  },
  DANCING_WITH_WITHOUT_CONTROL: {
    index: TOPIC_INDICES.DANCING_WITH_WITHOUT_CONTROL,
    key: TOPIC_KEYS.DANCING_WITH_WITHOUT_CONTROL,
    totalDays: TOPIC_TOTAL_DAYS.DANCING_WITH_WITHOUT_CONTROL,
  },
} as const;

// Helper function to get topic config by key
export const getTopicConfigByKey = (topicKey: string) => {
  return Object.values(TOPIC_CONFIG).find(config => config.key === topicKey);
};

// Helper function to get topic config by index
export const getTopicConfigByIndex = (topicIndex: number) => {
  return Object.values(TOPIC_CONFIG).find(config => config.index === topicIndex);
};

// Type definitions for better TypeScript support
export type TopicIndex = typeof TOPIC_INDICES[keyof typeof TOPIC_INDICES];
export type TopicKey = typeof TOPIC_KEYS[keyof typeof TOPIC_KEYS];

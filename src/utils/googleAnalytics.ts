
// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'G-CLLKZBE22N';

// Initialize Google Analytics
export const initGA = () => {
  // Create script tag for Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      ...parameters,
    });
  }
};

// Specific event tracking functions
export const trackSignUp = (method: string = 'email') => {
  trackEvent('sign_up', {
    method,
    event_category: 'authentication',
  });
};

export const trackLogin = (method: string = 'email') => {
  trackEvent('login', {
    method,
    event_category: 'authentication',
  });
};

export const trackTopicActivation = (topicName: string, topicIndex: number) => {
  trackEvent('topic_activation', {
    topic_name: topicName,
    topic_index: topicIndex,
    event_category: 'learning',
  });
};

export const trackDailyActivation = (topicName: string, dayNumber: number) => {
  trackEvent('daily_activation', {
    topic_name: topicName,
    day_number: dayNumber,
    event_category: 'learning',
  });
};

export const trackAssignmentLevel = (taskId: string, level: number, topicName: string) => {
  trackEvent('assignment_level_change', {
    task_id: taskId,
    level,
    topic_name: topicName,
    event_category: 'progress',
  });
};

export const trackAudioPlay = (audioType: string, audioTitle?: string) => {
  trackEvent('audio_play', {
    audio_type: audioType,
    audio_title: audioTitle,
    event_category: 'media',
  });
};

export const trackAudioPause = (audioType: string, audioTitle?: string) => {
  trackEvent('audio_pause', {
    audio_type: audioType,
    audio_title: audioTitle,
    event_category: 'media',
  });
};

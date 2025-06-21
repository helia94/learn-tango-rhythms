
import { useTopicProgressCheck } from '@/hooks/useTopicProgressCheck';

// This component automatically handles topic progression in the background
const TopicProgressManager = () => {
  useTopicProgressCheck();
  return null; // This component doesn't render anything
};

export default TopicProgressManager;

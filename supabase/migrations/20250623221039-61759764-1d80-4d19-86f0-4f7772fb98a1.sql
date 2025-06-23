
-- Remove the unique constraint that prevents reactivating topics
-- First, let's check if the constraint exists and remove it
DO $$ 
BEGIN
    -- Drop the unique constraint if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'idx_topic_activations_user_topic' 
        AND table_name = 'topic_activations'
    ) THEN
        ALTER TABLE public.topic_activations DROP CONSTRAINT idx_topic_activations_user_topic;
    END IF;
    
    -- Also check for unique index with similar name
    IF EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'idx_topic_activations_user_topic' 
        AND tablename = 'topic_activations'
    ) THEN
        DROP INDEX IF EXISTS public.idx_topic_activations_user_topic;
    END IF;
END $$;

-- Add a regular index for performance (non-unique)
CREATE INDEX IF NOT EXISTS idx_topic_activations_user_topic_performance 
ON public.topic_activations(user_id, topic_key, topic_index);

-- Add a comment to explain why we allow multiple activations
COMMENT ON TABLE public.topic_activations IS 'Stores topic activations. Users can reactivate topics multiple times, especially useful for practice and when unlock_all is enabled.';


-- Create a table to track when users start topics
CREATE TABLE public.topic_activations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  topic_index INTEGER NOT NULL,
  topic_key TEXT NOT NULL,
  activated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.topic_activations ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own topic activations
CREATE POLICY "Users can view their own topic activations" 
  ON public.topic_activations 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own topic activations
CREATE POLICY "Users can create their own topic activations" 
  ON public.topic_activations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own topic activations
CREATE POLICY "Users can update their own topic activations" 
  ON public.topic_activations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create index for better performance on user queries
CREATE INDEX idx_topic_activations_user_id ON public.topic_activations(user_id);

-- Create unique index to prevent duplicate activations for same user/topic
CREATE UNIQUE INDEX idx_topic_activations_user_topic ON public.topic_activations(user_id, topic_key);

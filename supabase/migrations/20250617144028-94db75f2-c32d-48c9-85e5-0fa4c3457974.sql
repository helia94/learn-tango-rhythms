
-- Create a table for daily topic activations
CREATE TABLE public.daily_topic_activations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  topic_key text NOT NULL,
  topic_index integer NOT NULL,
  day_index integer NOT NULL,
  activated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.daily_topic_activations ENABLE ROW LEVEL SECURITY;

-- Create policies for daily_topic_activations
CREATE POLICY "Users can view their own daily topic activations" 
  ON public.daily_topic_activations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily topic activations" 
  ON public.daily_topic_activations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily topic activations" 
  ON public.daily_topic_activations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily topic activations" 
  ON public.daily_topic_activations 
  FOR DELETE 
  USING (auth.uid() = user_id);

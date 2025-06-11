
-- Create a table for leaderboard entries
CREATE TABLE public.leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  city TEXT,
  score INTEGER NOT NULL,
  max_possible_score INTEGER NOT NULL DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to allow public read access
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view leaderboard entries
CREATE POLICY "Anyone can view leaderboard entries" 
  ON public.leaderboard 
  FOR SELECT 
  USING (true);

-- Create policy that allows anyone to insert leaderboard entries
CREATE POLICY "Anyone can create leaderboard entries" 
  ON public.leaderboard 
  FOR INSERT 
  WITH CHECK (true);

-- Create an index for better performance when querying by score
CREATE INDEX idx_leaderboard_score ON public.leaderboard (score DESC, created_at DESC);

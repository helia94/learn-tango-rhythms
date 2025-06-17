
-- Create a table for assignment reports/tracking
CREATE TABLE public.assignment_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  topic_name TEXT NOT NULL,
  topic_index INTEGER NOT NULL,
  assignment_key TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own assignment reports
ALTER TABLE public.assignment_reports ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own assignment reports
CREATE POLICY "Users can view their own assignment reports" 
  ON public.assignment_reports 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own assignment reports
CREATE POLICY "Users can create their own assignment reports" 
  ON public.assignment_reports 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX idx_assignment_reports_user_id ON public.assignment_reports(user_id);
CREATE INDEX idx_assignment_reports_topic ON public.assignment_reports(user_id, topic_name, topic_index);
CREATE INDEX idx_assignment_reports_assignment ON public.assignment_reports(user_id, assignment_key);

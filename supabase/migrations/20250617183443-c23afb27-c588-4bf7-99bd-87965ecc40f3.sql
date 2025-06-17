
-- Create user engagement tracking table
CREATE TABLE public.user_engagement (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  sessions_count INTEGER NOT NULL DEFAULT 0,
  time_spent_minutes INTEGER NOT NULL DEFAULT 0,
  assignments_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create user streaks tracking table
CREATE TABLE public.user_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  streak_type TEXT NOT NULL CHECK (streak_type IN ('daily', 'weekly')),
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, streak_type)
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  achievement_key TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  achievement_description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_key)
);

-- Create user sessions table for detailed tracking
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  session_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_end TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  page_views INTEGER DEFAULT 1,
  assignments_completed INTEGER DEFAULT 0
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.user_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_engagement
CREATE POLICY "Users can view their own engagement data" 
  ON public.user_engagement FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own engagement data" 
  ON public.user_engagement FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own engagement data" 
  ON public.user_engagement FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for user_streaks
CREATE POLICY "Users can view their own streaks" 
  ON public.user_streaks FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaks" 
  ON public.user_streaks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" 
  ON public.user_streaks FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for user_achievements
CREATE POLICY "Users can view their own achievements" 
  ON public.user_achievements FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
  ON public.user_achievements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS policies for user_sessions
CREATE POLICY "Users can view their own sessions" 
  ON public.user_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" 
  ON public.user_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
  ON public.user_sessions FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_engagement_user_date ON public.user_engagement(user_id, date);
CREATE INDEX idx_user_streaks_user_type ON public.user_streaks(user_id, streak_type);
CREATE INDEX idx_user_achievements_user_key ON public.user_achievements(user_id, achievement_key);
CREATE INDEX idx_user_sessions_user_start ON public.user_sessions(user_id, session_start);

-- Function to update engagement data
CREATE OR REPLACE FUNCTION public.update_daily_engagement(
  _user_id UUID,
  _date DATE DEFAULT CURRENT_DATE,
  _session_increment INTEGER DEFAULT 1,
  _time_increment INTEGER DEFAULT 0,
  _assignments_increment INTEGER DEFAULT 0
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_engagement (user_id, date, sessions_count, time_spent_minutes, assignments_completed)
  VALUES (_user_id, _date, _session_increment, _time_increment, _assignments_increment)
  ON CONFLICT (user_id, date) 
  DO UPDATE SET 
    sessions_count = user_engagement.sessions_count + _session_increment,
    time_spent_minutes = user_engagement.time_spent_minutes + _time_increment,
    assignments_completed = user_engagement.assignments_completed + _assignments_increment,
    updated_at = now();
END;
$$;

-- Function to update streaks
CREATE OR REPLACE FUNCTION public.update_user_streaks(_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _today DATE := CURRENT_DATE;
  _yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
  _current_week DATE := DATE_TRUNC('week', CURRENT_DATE)::DATE;
  _last_week DATE := (DATE_TRUNC('week', CURRENT_DATE) - INTERVAL '1 week')::DATE;
  _daily_streak_record RECORD;
  _weekly_streak_record RECORD;
  _has_today_activity BOOLEAN;
  _has_this_week_activity BOOLEAN;
BEGIN
  -- Check if user has activity today
  SELECT EXISTS(
    SELECT 1 FROM public.user_engagement 
    WHERE user_id = _user_id AND date = _today
  ) INTO _has_today_activity;
  
  -- Check if user has activity this week
  SELECT EXISTS(
    SELECT 1 FROM public.user_engagement 
    WHERE user_id = _user_id AND date >= _current_week
  ) INTO _has_this_week_activity;

  -- Handle daily streaks
  SELECT * FROM public.user_streaks 
  WHERE user_id = _user_id AND streak_type = 'daily'
  INTO _daily_streak_record;

  IF _daily_streak_record IS NULL THEN
    -- Create new daily streak record
    INSERT INTO public.user_streaks (user_id, streak_type, current_streak, longest_streak, last_activity_date)
    VALUES (_user_id, 'daily', 
            CASE WHEN _has_today_activity THEN 1 ELSE 0 END,
            CASE WHEN _has_today_activity THEN 1 ELSE 0 END,
            CASE WHEN _has_today_activity THEN _today ELSE _today - INTERVAL '1 day' END);
  ELSE
    -- Update existing daily streak
    IF _has_today_activity AND _daily_streak_record.last_activity_date < _today THEN
      -- Continuing or starting a streak
      IF _daily_streak_record.last_activity_date = _yesterday THEN
        -- Continuing streak
        UPDATE public.user_streaks 
        SET current_streak = current_streak + 1,
            longest_streak = GREATEST(longest_streak, current_streak + 1),
            last_activity_date = _today,
            updated_at = now()
        WHERE user_id = _user_id AND streak_type = 'daily';
      ELSE
        -- Starting new streak
        UPDATE public.user_streaks 
        SET current_streak = 1,
            longest_streak = GREATEST(longest_streak, 1),
            last_activity_date = _today,
            updated_at = now()
        WHERE user_id = _user_id AND streak_type = 'daily';
      END IF;
    ELSIF NOT _has_today_activity AND _daily_streak_record.last_activity_date < _yesterday THEN
      -- Streak broken
      UPDATE public.user_streaks 
      SET current_streak = 0,
          updated_at = now()
      WHERE user_id = _user_id AND streak_type = 'daily';
    END IF;
  END IF;

  -- Handle weekly streaks (similar logic for weeks)
  SELECT * FROM public.user_streaks 
  WHERE user_id = _user_id AND streak_type = 'weekly'
  INTO _weekly_streak_record;

  IF _weekly_streak_record IS NULL THEN
    INSERT INTO public.user_streaks (user_id, streak_type, current_streak, longest_streak, last_activity_date)
    VALUES (_user_id, 'weekly', 
            CASE WHEN _has_this_week_activity THEN 1 ELSE 0 END,
            CASE WHEN _has_this_week_activity THEN 1 ELSE 0 END,
            _current_week);
  ELSE
    IF _has_this_week_activity AND _weekly_streak_record.last_activity_date < _current_week THEN
      IF _weekly_streak_record.last_activity_date = _last_week THEN
        UPDATE public.user_streaks 
        SET current_streak = current_streak + 1,
            longest_streak = GREATEST(longest_streak, current_streak + 1),
            last_activity_date = _current_week,
            updated_at = now()
        WHERE user_id = _user_id AND streak_type = 'weekly';
      ELSE
        UPDATE public.user_streaks 
        SET current_streak = 1,
            longest_streak = GREATEST(longest_streak, 1),
            last_activity_date = _current_week,
            updated_at = now()
        WHERE user_id = _user_id AND streak_type = 'weekly';
      END IF;
    END IF;
  END IF;
END;
$$;

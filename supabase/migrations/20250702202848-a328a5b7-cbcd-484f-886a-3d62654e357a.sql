-- Add email preferences to profiles table
ALTER TABLE public.profiles 
ADD COLUMN email_preferences TEXT DEFAULT 'weekly_reminder' 
CHECK (email_preferences IN ('none', 'important_only', 'weekly_reminder'));

-- Create email tracking table for admin CRM
CREATE TABLE public.user_email_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  subject TEXT,
  opens INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on email tracking
ALTER TABLE public.user_email_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for email tracking (admin only)
CREATE POLICY "Admins can view all email tracking" 
ON public.user_email_tracking 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE username = (
    SELECT username FROM public.profiles 
    WHERE id = auth.uid()
  )
));

CREATE POLICY "System can insert email tracking" 
ON public.user_email_tracking 
FOR INSERT 
WITH CHECK (true);

-- Create unsubscribe tokens table
CREATE TABLE public.unsubscribe_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  token_type TEXT NOT NULL CHECK (token_type IN ('all', 'weekly')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on unsubscribe tokens
ALTER TABLE public.unsubscribe_tokens ENABLE ROW LEVEL SECURITY;

-- Policy for unsubscribe tokens (public access via token)
CREATE POLICY "Anyone can use valid unsubscribe tokens" 
ON public.unsubscribe_tokens 
FOR SELECT 
USING (expires_at > now() AND used_at IS NULL);

-- Function to generate unsubscribe token
CREATE OR REPLACE FUNCTION public.generate_unsubscribe_token(
  _user_id UUID,
  _token_type TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _token TEXT;
BEGIN
  -- Generate a secure random token
  _token := encode(gen_random_bytes(32), 'base64url');
  
  -- Insert the token (expires in 30 days)
  INSERT INTO public.unsubscribe_tokens (user_id, token, token_type, expires_at)
  VALUES (_user_id, _token, _token_type, now() + INTERVAL '30 days');
  
  RETURN _token;
END;
$$;

-- Function to use unsubscribe token
CREATE OR REPLACE FUNCTION public.use_unsubscribe_token(
  _token TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _token_record RECORD;
  _new_preference TEXT;
BEGIN
  -- Find and validate token
  SELECT * FROM public.unsubscribe_tokens 
  WHERE token = _token 
    AND expires_at > now() 
    AND used_at IS NULL
  INTO _token_record;
  
  IF _token_record IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Invalid or expired token');
  END IF;
  
  -- Determine new preference based on token type
  _new_preference := CASE 
    WHEN _token_record.token_type = 'all' THEN 'none'
    WHEN _token_record.token_type = 'weekly' THEN 'important_only'
    ELSE 'none'
  END;
  
  -- Update user preferences
  UPDATE public.profiles 
  SET email_preferences = _new_preference,
      updated_at = now()
  WHERE id = _token_record.user_id;
  
  -- Mark token as used
  UPDATE public.unsubscribe_tokens 
  SET used_at = now()
  WHERE id = _token_record.id;
  
  RETURN json_build_object(
    'success', true, 
    'preference', _new_preference,
    'token_type', _token_record.token_type
  );
END;
$$;
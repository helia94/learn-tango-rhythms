
-- Add preferred_language column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN preferred_language TEXT DEFAULT 'de';

-- Add a check constraint to ensure only valid language codes are stored
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_language_check 
CHECK (preferred_language IN ('en', 'de'));

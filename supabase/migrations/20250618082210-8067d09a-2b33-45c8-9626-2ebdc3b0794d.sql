
-- Create admin_users table to track admin users
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create unlock_all_activated table to track temporary unlock usage
CREATE TABLE public.unlock_all_activated (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL,
  time timestamp with time zone NOT NULL DEFAULT now(),
  index_activated integer NOT NULL CHECK (index_activated >= 1 AND index_activated <= 3),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(username, index_activated)
);

-- Add Row Level Security (RLS) to both tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unlock_all_activated ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users table
CREATE POLICY "Anyone can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Create policies for unlock_all_activated table  
CREATE POLICY "Users can view their own unlock activations" 
  ON public.unlock_all_activated 
  FOR SELECT 
  TO authenticated
  USING (username = (SELECT username FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert their own unlock activations" 
  ON public.unlock_all_activated 
  FOR INSERT 
  TO authenticated
  WITH CHECK (username = (SELECT username FROM public.profiles WHERE id = auth.uid()));

-- Create index for better performance on username lookups
CREATE INDEX idx_admin_users_username ON public.admin_users(username);
CREATE INDEX idx_unlock_all_activated_username ON public.unlock_all_activated(username);
CREATE INDEX idx_unlock_all_activated_time ON public.unlock_all_activated(time);

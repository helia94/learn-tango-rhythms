
-- Create RPC function to get user's Spotify connection
CREATE OR REPLACE FUNCTION public.get_user_spotify_connection(user_id UUID)
RETURNS TABLE(
  id UUID,
  access_token TEXT,
  refresh_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sc.id,
    sc.access_token,
    sc.refresh_token,
    sc.expires_at,
    sc.token_type,
    sc.scope,
    sc.created_at,
    sc.updated_at
  FROM public.spotify_connections sc
  WHERE sc.user_id = get_user_spotify_connection.user_id
    AND auth.uid() = sc.user_id;
END;
$$;

-- Create RPC function to delete user's Spotify connection
CREATE OR REPLACE FUNCTION public.delete_user_spotify_connection(user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.spotify_connections
  WHERE spotify_connections.user_id = delete_user_spotify_connection.user_id
    AND auth.uid() = spotify_connections.user_id;
END;
$$;

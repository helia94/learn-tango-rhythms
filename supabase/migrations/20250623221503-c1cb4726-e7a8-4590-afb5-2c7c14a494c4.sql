
-- Add DELETE policy for unlock_all_activated table
CREATE POLICY "Users can delete their own unlock activations" 
  ON public.unlock_all_activated 
  FOR DELETE 
  TO authenticated
  USING (username = (SELECT username FROM public.profiles WHERE id = auth.uid()));

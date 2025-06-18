
-- Create a function to get assignment progress timeline with cumulative totals
CREATE OR REPLACE FUNCTION public.get_assignment_progress_timeline(
  _user_id UUID,
  _start_date DATE DEFAULT NULL
)
RETURNS TABLE(
  date TEXT,
  daily_completed INTEGER,
  cumulative_total INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _actual_start_date DATE;
BEGIN
  -- If no start date provided, use the user's profile creation date
  IF _start_date IS NULL THEN
    SELECT created_at::DATE INTO _actual_start_date
    FROM public.profiles 
    WHERE id = _user_id;
  ELSE
    _actual_start_date := _start_date;
  END IF;

  -- If still no start date, use 30 days ago as fallback
  IF _actual_start_date IS NULL THEN
    _actual_start_date := CURRENT_DATE - INTERVAL '30 days';
  END IF;

  RETURN QUERY
  WITH daily_assignments AS (
    -- Group assignments by date
    SELECT 
      ar.created_at::DATE as assignment_date,
      COUNT(*) as daily_count
    FROM public.assignment_reports ar
    WHERE ar.user_id = _user_id
      AND ar.created_at::DATE >= _actual_start_date
      AND ar.level > 0  -- Only count completed assignments
    GROUP BY ar.created_at::DATE
  ),
  date_series AS (
    -- Generate a series of all dates from start to today
    SELECT generate_series(_actual_start_date, CURRENT_DATE, '1 day'::INTERVAL)::DATE as series_date
  ),
  assignments_with_gaps AS (
    -- Join with date series to fill gaps
    SELECT 
      ds.series_date,
      COALESCE(da.daily_count, 0) as daily_completed
    FROM date_series ds
    LEFT JOIN daily_assignments da ON ds.series_date = da.assignment_date
  )
  -- Calculate cumulative totals
  SELECT 
    awg.series_date::TEXT as date,
    awg.daily_completed::INTEGER,
    SUM(awg.daily_completed) OVER (ORDER BY awg.series_date)::INTEGER as cumulative_total
  FROM assignments_with_gaps awg
  ORDER BY awg.series_date;
END;
$$;

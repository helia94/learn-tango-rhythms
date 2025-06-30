import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";

const ExercisePageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flags } = useFeatureFlags();

  useEffect(() => {
    if (flags.forceExerciseReload && location.state?.fromRoadMap) {
      navigate(location.pathname, { replace: true, state: {} });
      window.location.reload();
    }
  }, [flags.forceExerciseReload, location, navigate]);

  return <>{children}</>;
};

export default ExercisePageWrapper; 
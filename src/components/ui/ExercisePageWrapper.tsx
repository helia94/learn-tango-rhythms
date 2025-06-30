import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExercisePageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.fromRoadMap) {
      navigate(location.pathname, { replace: true, state: {} });
      window.location.reload();
    }
  }, [location, navigate]);

  return <>{children}</>;
};

export default ExercisePageWrapper; 
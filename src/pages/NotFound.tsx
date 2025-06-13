
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="boho-panel p-8 max-w-md mx-auto">
          <h1 className="boho-title text-4xl font-display mb-4">404</h1>
          <p className="boho-subtitle text-lg mb-6">Oops! Page not found</p>
          <a href="/" className="boho-button inline-block">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

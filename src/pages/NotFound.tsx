
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
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary-red">404</h1>
        <p className="text-xl text-medium-gray dark:text-medium-gray mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary-red hover:text-dark-red underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

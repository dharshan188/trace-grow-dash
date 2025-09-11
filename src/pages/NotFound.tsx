import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
          <span className="text-3xl font-bold text-white">404</span>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 gradient-primary text-white rounded-lg hover-glow transition-all duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

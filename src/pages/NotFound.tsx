import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-8xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-serif text-foreground mb-4">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page "{location.pathname}" doesn't exist. Let's get you back to our beautiful bouquets.
        </p>
        <Link 
          to="/" 
          className="btn-luxury inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

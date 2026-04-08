import { Link } from "react-router-dom";
import { Home, LogIn, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const isAuthenticated = localStorage.getItem("auth_token");
  const isAdmin = localStorage.getItem("admin_user");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="text-[12rem] leading-none font-bold text-primary/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Link>
          
          <Link
            to={isAdmin ? "/admin/login" : "/login"}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-accent transition-colors"
          >
            <LogIn className="w-4 h-4" />
            {isAuthenticated || isAdmin ? "Go to Dashboard" : "Go to Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}
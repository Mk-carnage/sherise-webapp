import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen sherise-hero-gradient flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-community to-accent flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="font-display text-6xl font-bold sherise-gradient-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This page seems to have wandered off.
        </p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/">
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

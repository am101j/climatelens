import { Link, useLocation } from "react-router-dom";
import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">ClimateLens</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              asChild
              className="rounded-full"
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant={isActive("/report") ? "secondary" : "ghost"}
              asChild
              className="rounded-full"
            >
              <Link to="/report">Report</Link>
            </Button>
            <Button
              variant={isActive("/about") ? "secondary" : "ghost"}
              asChild
              className="rounded-full"
            >
              <Link to="/about">About</Link>
            </Button>
            <Button
              variant={isActive("/contact") ? "secondary" : "ghost"}
              asChild
              className="rounded-full"
            >
              <Link to="/contact">Contact</Link>
            </Button>
          </div>

          <Button asChild className="rounded-full shadow-soft bg-gradient-primary border-0 hover:shadow-floating transition-all duration-300">
            <Link to="/report">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
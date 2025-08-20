import { Cloud, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-soft">
              <Cloud className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">ClimateLens</span>
          </div>

          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-accent fill-current" />
            <span>for climate awareness</span>
          </div>

          <div className="text-sm text-muted-foreground mt-4 md:mt-0">
            © 2024 ClimateLens. Know before you buy.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
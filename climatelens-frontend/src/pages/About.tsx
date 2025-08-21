import { Card } from "@/components/ui/card";
import { AlertTriangle, Target, Brain, Lightbulb } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About ClimateLens
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering property buyers with AI-powered climate risk insights to make informed decisions for their future
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">The Problem</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Property buyers make one of their largest financial decisions without knowing the climate risks that could affect their investment. Traditional real estate doesn't provide comprehensive environmental risk assessments, leaving buyers vulnerable to floods, fires, extreme heat, and poor air quality.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 flex-shrink-0">
                  <Target className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    ClimateLens provides clear, comprehensive climate risk reports that help property buyers understand environmental challenges before they buy. Our platform transforms complex climate data into actionable insights that anyone can understand.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft flex-shrink-0">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered Analysis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform will integrate with GPT-5 for intelligent summarization and EnviroTrust for comprehensive climate data. This powerful combination ensures accurate, up-to-date risk assessments that account for both current conditions and future projections.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We envision a future where every property transaction includes climate risk transparency. By making environmental data accessible and understandable, we help people make informed decisions that protect their families and investments.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Key Features Section */}
        <Card className="p-12 bg-gradient-card shadow-floating border-0 rounded-3xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            What Makes ClimateLens Different
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">5</div>
              <h3 className="text-lg font-semibold text-foreground">Risk Categories</h3>
              <p className="text-muted-foreground text-sm">
                Comprehensive analysis of flood, fire, heat, air quality, and wind risks
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-secondary">AI</div>
              <h3 className="text-lg font-semibold text-foreground">Powered</h3>
              <p className="text-muted-foreground text-sm">
                Advanced AI models process complex environmental data into clear insights
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-accent">1</div>
              <h3 className="text-lg font-semibold text-foreground">Simple Report</h3>
              <p className="text-muted-foreground text-sm">
                Easy-to-understand PDF reports you can share with anyone
              </p>
            </div>
          </div>
        </Card>

        {/* Technology Note */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-muted/20 border border-dashed border-muted-foreground/30 rounded-2xl inline-block">
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-3">Coming Soon</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                ClimateLens is currently in development. The current version demonstrates our vision with mock data. 
                Full integration with GPT-5 summarization and EnviroTrust climate data will provide real-time, 
                accurate assessments for any property address.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
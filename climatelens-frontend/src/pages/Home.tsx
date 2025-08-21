import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, BarChart3, FileCheck, Zap } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-climate.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Know your home's{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  climate risks
                </span>{" "}
                before you buy
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get comprehensive climate risk assessments powered by AI. Make informed property decisions with detailed reports on flood, fire, heat, and air quality risks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg"
                  className="rounded-full bg-gradient-primary border-0 shadow-floating hover:shadow-floating hover:scale-105 transition-all duration-300"
                >
                  <Link to="/report" className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="rounded-full border-primary/20 hover:border-primary/40 hover:bg-primary-soft transition-all duration-300"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-float">
              <img
                src={heroImage}
                alt="Climate risk assessment visualization"
                className="w-full h-auto rounded-3xl shadow-floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose ClimateLens?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI analysis meets comprehensive climate data to give you the complete picture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 bg-gradient-card shadow-card border-0 rounded-2xl hover:shadow-floating transition-all duration-300 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-soft mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Risk Assessment</h3>
              <p className="text-muted-foreground text-sm">
                Comprehensive analysis of flood, fire, heat, and air quality risks for any location
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-card border-0 rounded-2xl hover:shadow-floating transition-all duration-300 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary shadow-soft mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Data Visualization</h3>
              <p className="text-muted-foreground text-sm">
                Clear charts and graphs that make complex climate data easy to understand
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-card border-0 rounded-2xl hover:shadow-floating transition-all duration-300 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-soft mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileCheck className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Detailed Reports</h3>
              <p className="text-muted-foreground text-sm">
                Professional PDF reports you can share with agents, lenders, and insurers
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-card border-0 rounded-2xl hover:shadow-floating transition-all duration-300 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-soft mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered</h3>
              <p className="text-muted-foreground text-sm">
                Advanced AI summarizes complex environmental data into actionable insights
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your climate risk report in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-floating mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Enter Address</h3>
              <p className="text-muted-foreground">
                Simply enter the property address you want to analyze
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary shadow-floating mx-auto">
                <span className="text-2xl font-bold text-secondary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI processes environmental data and climate models
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-floating mx-auto">
                <span className="text-2xl font-bold text-accent-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Report</h3>
              <p className="text-muted-foreground">
                Receive a comprehensive risk assessment and recommendations
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg"
              className="rounded-full bg-gradient-primary border-0 shadow-floating hover:shadow-floating hover:scale-105 transition-all duration-300"
            >
              <Link to="/report" className="flex items-center gap-2">
                Start Your Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
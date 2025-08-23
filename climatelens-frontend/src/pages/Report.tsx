import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Download, MapPin, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RiskChart from "@/components/RiskChart";
import PaywallModal from "@/components/PaywallModal";
import { fetchPreview, downloadFullReport, type ClimatePreview } from "@/services/api";

const Report = () => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // New state for download loading
  const [preview, setPreview] = useState<ClimatePreview | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    if (!address.trim()) {
      toast({
        title: "Please enter an address",
        description: "We need an address to generate your climate risk report.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchPreview(address);
      setTimeout(() => {
        setPreview(data);
        toast({
          title: "Report Generated!",
          description: "Your climate risk preview is ready.",
        });
        setIsLoading(false);
      }, 500); // Slight delay for preview to show up
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!preview) return;

    const isPaid = localStorage.getItem('paid') === 'true';
    
    if (!isPaid) {
      setShowPaywall(true);
      return;
    }

    setIsDownloading(true); // Set downloading to true
    try {
      await downloadFullReport(preview.address);
      toast({
        title: "Download Started",
        description: "Your full climate risk report is downloading.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false); // Reset downloading state
    }
  };

  const handlePaymentSuccess = () => {
    if (preview) {
      handleDownloadReport();
    }
  };

  const getRiskColor = (level: string) => {
    const colors = {
      'Low': 'text-green-600',
      'Medium': 'text-yellow-600',
      'Moderate': 'text-orange-600',
      'High': 'text-red-600'
    };
    return colors[level as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Climate Risk Assessment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter any address to get a comprehensive climate risk analysis
          </p>
        </div>

        {/* Address Input */}
        <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl max-w-2xl mx-auto mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Property Address</h2>
            </div>
            
            <div className="flex gap-4">
              <Input
                placeholder="Enter property address (e.g., 123 Main St, City, State)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateReport()}
                className="flex-1 rounded-full border-primary/20 focus:border-primary bg-background/50"
              />
              <Button
                onClick={handleGenerateReport}
                disabled={isLoading}
                className="rounded-full bg-gradient-primary border-0 shadow-soft hover:shadow-floating transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Generate Report
                  </div>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Report Preview */}
        {preview && (
          <div className="space-y-8 animate-fade-in">
            {/* Summary Card */}
            <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Risk Assessment Summary
                  </h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {preview.address}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Overall Risk</div>
                  <div className={`text-2xl font-bold ${getRiskColor(preview.overallRisk)}`}>
                    {preview.overallRisk}
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{preview.summary}</p>
                </div>
              </div>

              <Button
                onClick={handleDownloadReport}
                disabled={isDownloading} // Disable button during download
                className="w-full rounded-full bg-gradient-primary border-0 shadow-soft hover:shadow-floating transition-all duration-300"
              >
                {isDownloading ? ( // Show loading indicator
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Downloading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report (PDF)
                  </div>
                )}
              </Button>
            </Card>

            {/* Risk Breakdown */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6">Risk Levels</h3>
                <div className="space-y-4">
                  {preview.risks.map((risk) => (
                    <div key={risk.name} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                      <span className="font-medium text-foreground">{risk.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">{risk.value}%</div>
                          <div className={`text-sm font-medium ${getRiskColor(risk.level)}`}>
                            {risk.level}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-6">Risk Visualization</h3>
                <RiskChart data={preview.risks} type="bar" />
              </Card>
            </div>

            <Card className="p-8 bg-gradient-card shadow-card border-0 rounded-2xl">
              <h3 className="text-xl font-semibold text-foreground mb-6">Risk Distribution</h3>
              <RiskChart data={preview.risks} type="pie" />
            </Card>
          </div>
        )}
      </div>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <Footer />
    </div>
  );
};

export default Report;
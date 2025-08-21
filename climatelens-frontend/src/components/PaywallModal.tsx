import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Download, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaywallModal = ({ isOpen, onClose, onPaymentSuccess }: PaywallModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      localStorage.setItem('paid', 'true');
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
      
      toast({
        title: "Payment Successful!",
        description: "You can now download the full climate risk report.",
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Download className="h-5 w-5 text-primary" />
            Unlock Full Climate Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card shadow-card rounded-2xl border-0">
            <div className="text-center space-y-4">
              <div className="text-3xl font-bold text-primary">$9.99</div>
              <div className="text-sm text-muted-foreground">One-time payment</div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-secondary" />
                <span className="text-sm">Detailed risk assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-secondary" />
                <span className="text-sm">Historical climate data</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-secondary" />
                <span className="text-sm">Future projections</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-secondary" />
                <span className="text-sm">Downloadable PDF report</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-full"
              disabled={isProcessing}
            >
              Maybe Later
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 rounded-full bg-gradient-primary border-0 shadow-soft hover:shadow-floating transition-all duration-300"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;
// TODO(GPT5): Replace preview call with real GPT-5 + EnviroTrust-backed endpoint when available.
// TODO(PAYMENT): Replace dummy payment flow with Stripe/PayPal integration.
// NOTE: No database used. Using localStorage for a simple 'paid' flag only.

export interface RiskData {
  name: string;
  value: number;
  level: 'Low' | 'Medium' | 'Moderate' | 'High';
}

export interface ClimatePreview {
  address: string;
  overallRisk: string;
  risks: RiskData[];
  summary: string;
}

// Mock function to simulate API call for climate preview
export const fetchPreview = async (address: string): Promise<ClimatePreview> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock risk data - in real app this would come from GPT-5 + EnviroTrust
  const mockRisks: RiskData[] = [
    { name: 'Flood Risk', value: 75, level: 'High' },
    { name: 'Air Quality', value: 60, level: 'Moderate' },
    { name: 'Heat Risk', value: 45, level: 'Medium' },
    { name: 'Wildfire Hazard', value: 25, level: 'Low' },
    { name: 'Wind Damage', value: 50, level: 'Medium' }
  ];

  return {
    address,
    overallRisk: 'Moderate',
    risks: mockRisks,
    summary: `Based on our analysis of ${address}, this location shows moderate climate risks. Key concerns include elevated flood risk due to proximity to water bodies and moderate air quality challenges. The property benefits from low wildfire risk and manageable heat exposure.`
  };
};

// Dummy payment creation
export const createPayment = async (amount: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    sessionId: 'dummy_session_' + Date.now(),
    clientSecret: 'dummy_secret'
  };
};

// Dummy payment verification
export const verifyPayment = async (sessionId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    success: true,
    paid: true
  };
};

// Mock PDF download
export const downloadFullReport = async (address: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create a dummy PDF blob
  const pdfContent = `Climate Risk Report for ${address}\n\nThis is a mock PDF that would contain detailed climate risk analysis.`;
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  
  // Create download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `climate-risk-report-${address.replace(/\s+/g, '-').toLowerCase()}.pdf`;
  a.click();
  
  window.URL.revokeObjectURL(url);
};
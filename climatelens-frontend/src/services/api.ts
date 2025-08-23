
import axios from 'axios';
import { BACKEND_URL } from '../config';

const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

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

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export const fetchPreview = async (address: string): Promise<ClimatePreview> => {
  const response = await apiClient.post('/report/preview', { address });
  return response.data;
};

export const downloadFullReport = async (address: string) => {
  const response = await apiClient.get(`/report/download?address=${address}`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `climate-risk-report-${address.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  document.body.appendChild(link);
  link.click();
  
  // Clean up and remove the link
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const submitContactForm = async (formData: ContactFormData) => {
    const response = await apiClient.post('/contact', formData);
    return response.data;
};

// TODO(PAYMENT): Replace dummy payment flow with Stripe/PayPal integration.
// NOTE: No database used. Using localStorage for a simple 'paid' flag only.

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

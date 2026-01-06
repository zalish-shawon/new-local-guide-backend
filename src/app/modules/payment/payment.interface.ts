import { Types } from 'mongoose';

export interface TPayment {
  bookingId: Types.ObjectId;
  amount: number;
  transactionId: string;
  status: 'pending' | 'paid' | 'failed';
  gatewayData?: any; // To store response from Stripe/SSLCommerz
}
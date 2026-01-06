import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  gatewayData: { type: Object },
}, { timestamps: true });

export const Payment = model<TPayment>('Payment', paymentSchema);
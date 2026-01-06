import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { Booking } from '../booking/booking.model';
import { Payment } from './payment.model';

// 1. Create Payment Intent (Used by Frontend to show Payment Form)
const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    const result = await PaymentService.createPaymentIntent(bookingId);

    res.status(200).json({
      success: true,
      message: 'Payment Intent created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

// Let's add a manual "Confirm Payment" endpoint that Frontend calls after Stripe success.
const confirmPayment = async (req: Request, res: Response) => {
    try {
        const { bookingId, transactionId } = req.body;

        // Update Booking
        await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' });
        
        // Create Payment Record
        await Payment.create({
            bookingId,
            transactionId,
            amount: 0, // You might want to fetch real amount or pass it
            status: 'paid'
        });

        res.status(200).json({
            success: true,
            message: 'Payment confirmed successfully',
            data: {}
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const PaymentController = {
  createPaymentIntent,
  confirmPayment
};
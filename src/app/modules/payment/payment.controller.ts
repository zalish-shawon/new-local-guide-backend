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


const confirmationService = async (req: Request, res: Response) => {
  try {
    const { transactionId, bookingId, status } = req.body;

    // 1. 🔍 FIND THE BOOKING FIRST
    // We need to find the booking to know how much money was actually paid.
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // 2. 🚨 CRITICAL FIX: Get the price from the Booking
    // If we don't do this, it defaults to 0
    const realAmount = booking.totalPrice || 0; 

    // 3. Create the Payment Record with the REAL Amount
    const result = await Payment.create({
      bookingId,
      transactionId,
      status: status || 'paid',
      amount: realAmount, // <--- THIS WAS MISSING OR 0 BEFORE
    });

    // 4. Update Booking Status to Confirmed (Optional, if not done elsewhere)
    await Booking.findByIdAndUpdate(bookingId, { 
      status: 'confirmed', 
      isPaid: true,
      paidAmount: realAmount 
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified and saved successfully',
      data: result,
    });

  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

export const PaymentController = {
  createPaymentIntent,
  confirmPayment,
  confirmationService
};
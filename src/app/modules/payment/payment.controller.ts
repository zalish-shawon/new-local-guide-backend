import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { Booking } from '../booking/booking.model';
import { Payment } from './payment.model';

// 1. Create Payment Intent (Used by Frontend to start payment)
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

// 2. Confirm Payment (Called by Frontend after Stripe success)
const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { transactionId, bookingId, status } = req.body;

    // 1. Find the booking to get the REAL price
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // 2. Get the price from the Booking (Prevent 0 amount bug)
    const realAmount = booking.totalPrice || 0; 

    // 3. Create the Payment Record
    const result = await Payment.create({
      bookingId,
      transactionId,
      status: status || 'paid',
      amount: realAmount, // <--- Correct Amount Saved Here
    });

    // 4. Update Booking Status
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
};
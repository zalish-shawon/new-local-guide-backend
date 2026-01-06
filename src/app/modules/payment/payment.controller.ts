import { Request, Response } from 'express';
import { Payment } from './payment.model';
import { Booking } from '../booking/booking.model';
import mongoose from 'mongoose';

const makePayment = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { bookingId, amount, transactionId } = req.body;

    // 1. Create Payment Record
    const payment = await Payment.create([{
      bookingId,
      amount,
      transactionId,
      status: 'paid'
    }], { session });

    // 2. Update Booking Status to 'confirmed' (or 'paid')
    await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'confirmed' },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: 'Payment recorded and Booking Confirmed',
      data: payment[0],
    });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

export const PaymentController = {
  makePayment,
};
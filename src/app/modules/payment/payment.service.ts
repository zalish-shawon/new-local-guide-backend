import Stripe from 'stripe';
import config from '../../config';
import { Booking } from '../booking/booking.model';

const stripe = new Stripe(config.stripe_secret_key as string);

const createPaymentIntent = async (bookingId: string) => {
  // 1. Find the booking to get the amount
  const booking = await Booking.findById(bookingId).populate('tour');
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.status === 'confirmed') {
    throw new Error('This booking is already paid for!');
  }

  // 2. Calculate amount (Stripe expects amount in cents/poisha, so multiply by 100)
  // Assuming booking.totalPrice is in dollars/taka
  const amount = Math.round(booking.totalPrice * 100);

  // 3. Create Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd', // or 'bdt' if your stripe account supports it
    payment_method_types: ['card'],
    metadata: {
      bookingId: booking._id.toString(), // Keep track of which booking this is for
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

export const PaymentService = {
  createPaymentIntent,
};
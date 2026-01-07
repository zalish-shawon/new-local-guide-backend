import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { Booking } from "./booking.model";
import { Tour } from "../tour/tour.model";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-12-15.clover", // Use your version
});

const createBooking = async (req: Request, res: Response) => {
  try {
    const { tourId, slots, date } = req.body;

    // 1. Find the Tour to get the real price
    const tour = await Tour.findById(tourId);
    if (!tour) throw new Error("Tour not found");

    // 2. 🚨 FIX: Calculate Total Price (Price × People)
    const totalPrice = tour.price * slots;

    // 3. Create the Booking Object
    const bookingData = {
      tourist: req.user.userId, 
      guide: tour.guide, 
      tour: tourId,
      date,
      slots,
      totalPrice,
      status: "pending",
    };

    const result = await Booking.create(bookingData);

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.user;
    const result = await BookingService.getUserBookings(userId, role);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};



// Add this if missing
const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Populate tour and tourist details for the invoice
    const result = await Booking.findById(id)
      .populate('tour')
      .populate('tourist', 'name email');

    res.status(200).json({
      success: true,
      message: 'Booking retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await BookingService.updateBookingStatus(id, status);

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;

    // 1. Get the booking details
    const booking = await Booking.findById(bookingId).populate("tour");
    if (!booking) throw new Error("Booking not found");

    // 2. 🚨 FIX: Convert Price to Cents for Stripe
    // If totalPrice is 500, Amount must be 50000
    const amountToCharge = Math.round(booking.totalPrice * 100);

    // 3. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToCharge,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { bookingId: booking._id.toString() },
    });

    res.status(200).json({
      success: true,
      message: "Payment intent created",
      data: {
        clientSecret: paymentIntent.client_secret,
        // Optional: Send this back to check if calculation is correct
        amount: booking.totalPrice,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateStatus,
  createPaymentIntent,
};

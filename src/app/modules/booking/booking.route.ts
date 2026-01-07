import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// 1. Create Booking (Tourist Only)
router.post(
  '/create-booking',
  auth('tourist'),
  BookingController.createBooking
);

// 2. Get All Bookings (Filtered by Role inside Service)
router.get(
  '/',
  auth('admin', 'guide', 'tourist'),
  BookingController.getAllBookings
);

router.get(
  '/:id', 
  auth('admin', 'guide', 'tourist'), // Anyone involved can view it
  BookingController.getSingleBooking
);

// 3. Update Status (Guide or Admin Only)
router.patch(
  '/:id/status',
  auth('admin', 'guide'),
  BookingController.updateStatus
);

router.post(
  '/create-payment-intent',
  auth('tourist'),
  BookingController.createPaymentIntent
);

export const BookingRoutes = router;
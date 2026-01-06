import mongoose from 'mongoose';
import { Booking } from './booking.model';
import { Tour } from '../tour/tour.model';
import { TBooking } from './booking.interface';

const createBooking = async (
  tourId: string, 
  touristId: string, 
  date: Date
) => {
  // 1. Find the Tour to get details (price, guide)
  const tour = await Tour.findById(tourId);
  if (!tour) {
    throw new Error('Tour not found');
  }

  // 2. Prepare Booking Data
  // We automatically set the Guide ID based on the Tour
  const bookingData: Partial<TBooking> = {
    tourist: new mongoose.Types.ObjectId(touristId),
    guide: tour.guide, // The guide who owns the tour
    tour: tour._id,
    date: date,
    totalPrice: tour.price, // Using the fixed Tour price
    status: 'pending',
  };

  const result = await Booking.create(bookingData);
  return result;
};

// Get bookings for the specific logged-in user
const getUserBookings = async (userId: string, role: string) => {
  let query = {};
  
  if (role === 'guide') {
    query = { guide: userId }; // Guides see bookings assigned to them
  } else if (role === 'tourist') {
    query = { tourist: userId }; // Tourists see their own bookings
  }
  // Admins see everything (empty query)

  const result = await Booking.find(query)
    .populate('tour', 'title price')
    .populate('tourist', 'name email')
    .populate('guide', 'name email');
    
  return result;
};

const updateBookingStatus = async (bookingId: string, status: string) => {
  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );
  return result;
};

export const BookingService = {
  createBooking,
  getUserBookings,
  updateBookingStatus,
};
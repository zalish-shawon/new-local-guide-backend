import { Request, Response } from 'express';
import { BookingService } from './booking.service';

const createBooking = async (req: Request, res: Response) => {
  try {
    const { tourId, date } = req.body;
    const touristId = req.user.userId;

    const result = await BookingService.createBooking(tourId, touristId, date);

    res.status(201).json({
      success: true,
      message: 'Booking request sent successfully',
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
      message: 'Bookings retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
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

export const BookingController = {
  createBooking,
  getAllBookings,
  updateStatus,
};
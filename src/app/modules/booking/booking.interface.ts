import { Types } from 'mongoose';

export type TBookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface TBooking {
  tourist: Types.ObjectId;
  guide: Types.ObjectId;
  tour: Types.ObjectId;
  date: Date;
  status: TBookingStatus;
  totalPrice: number;
}
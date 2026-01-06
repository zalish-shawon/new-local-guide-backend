import { Types } from 'mongoose';

export interface TTour {
  title: string;
  description: string;
  price: number;
  duration: number; // in hours
  meetingPoint: string;
  maxGroupSize: number;
  images: string[];
  category: string; // Food, Art, Adventure
  guide: Types.ObjectId; // Reference to the User (Guide)
  isActive: boolean;
}
import { Types } from 'mongoose';

export interface TReview {
  tourId: Types.ObjectId;
  userId: Types.ObjectId; // The tourist
  rating: number; // 1 to 5
  comment: string;
}
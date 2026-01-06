import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';
import { Tour } from '../tour/tour.model';

const reviewSchema = new Schema<TReview>({
  tourId: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

// Optional: Calculate Average Rating for the Tour after saving a review
reviewSchema.post('save', async function() {
  const stats = await Review.aggregate([
    { $match: { tourId: this.tourId } },
    { $group: { _id: '$tourId', avgRating: { $avg: '$rating' }, nRatings: { $sum: 1 } } }
  ]);
  
  if (stats.length > 0) {
    // You could add averageRating field to your Tour model to store this
    // await Tour.findByIdAndUpdate(this.tourId, { averageRating: stats[0].avgRating });
  }
});

export const Review = model<TReview>('Review', reviewSchema);
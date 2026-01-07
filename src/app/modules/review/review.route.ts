import express from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// 1. Create a Review (Only 'tourist' can review)
// We use the string 'tourist' directly here
router.post(
  '/', 
  auth('tourist'), 
  ReviewController.createReview
);

// 2. Get Reviews for a specific Tour (Publicly accessible)
router.get(
  '/:tourId', 
  ReviewController.getReviewsForTour
);

export const ReviewRoutes = router;
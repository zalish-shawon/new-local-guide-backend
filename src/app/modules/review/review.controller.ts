import { Request, Response } from 'express';
import { Review } from './review.model';

const createReview = async (req: Request, res: Response) => {
  try {
    const { tourId, rating, comment } = req.body;
    const userId = req.user.userId;

    // Optional: Check if user actually booked this tour here
    
    const result = await Review.create({
      tourId,
      userId,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

const getReviewsForTour = async (req: Request, res: Response) => {
  try {
    const { tourId } = req.params;
    const result = await Review.find({ tourId }).populate('userId', 'name profileImg');

    res.status(200).json({
      success: true,
      message: 'Reviews retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

export const ReviewController = {
  createReview,
  getReviewsForTour,
};
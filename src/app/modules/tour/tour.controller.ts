import { Request, Response } from 'express';
import { TourService } from './tour.service';
import { Tour } from './tour.model';

const createTour = async (req: Request, res: Response) => {
  try {
    // Force the guide field to be the logged-in user's ID
    const tourData = {
      ...req.body,
      guide: req.user.userId, 
    };

    const result = await TourService.createTour(tourData);

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

const getAllTours = async (req: Request, res: Response) => {
  try {
    const result = await TourService.getAllTours();
    res.status(200).json({
      success: true,
      message: 'Tours retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

const getSingleTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await TourService.getSingleTour(id);
    res.status(200).json({
      success: true,
      message: 'Tour retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

const deleteTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Hard delete or Soft delete depending on preference
    const result = await Tour.findByIdAndDelete(id); 
    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

export const TourController = {
  createTour,
  getAllTours,
  getSingleTour,
  deleteTour,
};
import express from 'express';
import { TourController } from './tour.controller';
import auth from '../../middlewares/auth';
import { TourValidation } from './tour.validation';
// You can use a validation middleware here (e.g. validateRequest(schema))

const router = express.Router();

// Public Routes
router.get('/', TourController.getAllTours);
router.get('/:id', TourController.getSingleTour);

// Protected Routes (Only Guides and Admins can create tours)
router.post(
  '/create-tour', 
  auth('guide', 'admin'), 
  // validateRequest(TourValidation.createTourValidationSchema), // Add validation middleware if you have it
  TourController.createTour
);

// Add PATCH route
router.patch(
  '/:id', 
  auth('admin', 'guide'), 
  TourController.updateTour
);

// Add DELETE route
router.delete(
  '/:id', 
  auth('admin', 'guide'), // Admins and Guides can delete
  TourController.deleteTour // Ensure this method exists in your controller!
);

export const TourRoutes = router;
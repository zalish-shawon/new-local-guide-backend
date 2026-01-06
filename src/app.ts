import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { TourRoutes } from './app/modules/tour/tour.route';
import { BookingRoutes } from './app/modules/booking/booking.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors()); // Allow frontend to connect

// Application Routes
// We will add more routes here (e.g., /api/v1/tours) later
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/tours', TourRoutes);
app.use('/api/v1/bookings', BookingRoutes);
app.use('/api/v1/payments', PaymentRoutes);
// Test Route (Optional, just to check if server is running)
app.get('/', (req: Request, res: Response) => {
  res.send('Local Guide Platform Backend is Running!');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Handler
app.use(notFound);

export default app;
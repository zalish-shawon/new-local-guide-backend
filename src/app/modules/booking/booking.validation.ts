import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    tourId: z.string(),
    date: z.string().datetime(), // Ensures valid ISO date string
  }),
});

const updateBookingStatusSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingStatusSchema,
};
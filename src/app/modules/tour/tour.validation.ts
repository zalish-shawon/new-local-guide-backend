import { z } from 'zod';

const createTourValidationSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    price: z.number().positive(),
    duration: z.number().positive(),
    meetingPoint: z.string(),
    maxGroupSize: z.number().int().positive(),
    category: z.string(),
    images: z.array(z.string()).optional(),
    // 'guide' field will be set from the logged-in user, not the body
  }),
});

const updateTourValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const TourValidation = {
  createTourValidationSchema,
  updateTourValidationSchema,
};
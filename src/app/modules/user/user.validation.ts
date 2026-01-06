import { z } from 'zod';

const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().max(20),
    role: z.enum(['tourist', 'guide', 'admin']).default('tourist'),
    // Add other optional fields if needed for registration
  }),
});

export const UserValidation = {
  userRegisterValidationSchema,
};
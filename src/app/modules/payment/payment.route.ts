import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// 1. User asks to pay for a booking
router.post(
    '/create-payment-intent', 
    auth('tourist'), 
    PaymentController.createPaymentIntent
);

// 2. User confirms payment finished (Simplest approach for now)
router.post(
    '/confirm', 
    auth('tourist'), 
    PaymentController.confirmPayment
);

export const PaymentRoutes = router;
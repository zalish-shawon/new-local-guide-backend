import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// In real life, this might be a webhook or a secure endpoint
router.post('/process', auth('tourist'), PaymentController.makePayment);

export const PaymentRoutes = router;
import express from 'express';
import { AuthController } from './auth.controller';
// You can add a validation middleware here using the Zod schemas created in 2.1

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export const AuthRoutes = router;
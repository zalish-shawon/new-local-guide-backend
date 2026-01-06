import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Only Admins can see all users or block them
router.get('/', auth('admin'), UserController.getAllUsers);
router.patch('/:id/block', auth('admin'), UserController.blockUser);

export const UserRoutes = router;
import { Request, Response } from 'express';
import { User } from './user.model';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.find();
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, error: err });
  }
};

export const UserController = {
  getAllUsers,
  blockUser,
};
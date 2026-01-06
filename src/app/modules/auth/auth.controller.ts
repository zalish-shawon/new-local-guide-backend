import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const register = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.registerUser(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUser(req.body);
    const { accessToken } = result;

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        accessToken,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const AuthController = {
  register,
  login,
};
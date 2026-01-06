import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';
import { TLoginUser } from './auth.interface'; // Define simple interface {email, password}
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const registerUser = async (payload: TUser) => {
  // Check if user already exists
  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists) {
    throw new Error('User already exists');
  }

  // Create user (Password hashing is handled in User Model pre-save hook)
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // 1. Check if user exists
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new Error('User not found');
  }

  // 2. Check if user is blocked
  if (user.isBlocked) {
    throw new Error('User is blocked');
  }

  // 3. Check password match
  const isPasswordMatched = await bcrypt.compare(payload.password, user.password!);
  if (!isPasswordMatched) {
    throw new Error('Password do not match');
  }

  // 4. Generate JWT Token
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    user,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        throw new Error('You are not authorized!');
      }

      // FIX: Check if token starts with "Bearer " and remove it
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }

      // Verify Token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, userId } = decoded;

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found!');
      }

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new Error('You are not authorized to perform this action');
      }

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
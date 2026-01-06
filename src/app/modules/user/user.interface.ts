import { Model } from 'mongoose';

export type TUserRole = 'tourist' | 'guide' | 'admin';

export interface TUser {
  name: string;
  email: string;
  password?: string; // Optional because we might hash it/remove it
  role: TUserRole;
  profileImg?: string;
  bio?: string;
  languages?: string[];
  isBlocked: boolean;
  
  // Guide Specific Fields
  expertise?: string[]; // e.g., History, Nightlife
  dailyRate?: number;
  
  // Tourist Specific Fields
  preferences?: string[]; // e.g., Nature, Food
}

export interface UserModel extends Model<TUser> {
  // Static methods can go here (e.g., isUserExists)
}
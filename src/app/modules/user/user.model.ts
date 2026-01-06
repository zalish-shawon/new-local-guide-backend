import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 }, // select: 0 hides password by default
    role: {
      type: String,
      enum: ["tourist", "guide", "admin"],
      default: "tourist",
    },
    profileImg: { type: String },
    bio: { type: String },
    languages: { type: [String], default: [] },
    isBlocked: { type: Boolean, default: false },

    // Guide specific
    expertise: { type: [String] },
    dailyRate: { type: Number },

    // Tourist specific
    preferences: { type: [String] },
  },
  { timestamps: true }
);

// Pre-save middleware to hash password
userSchema.pre("save", async function (this: any) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export const User = model<TUser, UserModel>("User", userSchema);

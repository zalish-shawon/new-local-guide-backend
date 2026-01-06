import { Schema, model } from 'mongoose';
import { TTour } from './tour.interface';

const tourSchema = new Schema<TTour>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  meetingPoint: { type: String, required: true },
  maxGroupSize: { type: Number, required: true },
  images: { type: [String], default: [] },
  category: { type: String, required: true },
  guide: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Tour = model<TTour>('Tour', tourSchema);
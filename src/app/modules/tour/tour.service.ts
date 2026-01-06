import { TTour } from './tour.interface';
import { Tour } from './tour.model';

const createTour = async (payload: TTour) => {
  const result = await Tour.create(payload);
  return result;
};

const getAllTours = async () => {
  // We can add search/filters here later
  const result = await Tour.find({ isActive: true }).populate('guide', 'name email profileImg');
  return result;
};

const getSingleTour = async (id: string) => {
  const result = await Tour.findById(id).populate('guide', 'name email');
  return result;
};

const updateTour = async (id: string, payload: Partial<TTour>) => {
  const result = await Tour.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteTour = async (id: string) => {
  // Soft delete: just set isActive to false
  const result = await Tour.findByIdAndUpdate(id, { isActive: false }, { new: true });
  return result;
};

export const TourService = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
};
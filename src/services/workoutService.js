import Workout from '../models/workoutModel.js';
import CustomError from '../utils/customError.js';

const workoutService = {
  getAll: async () => {
    try {
      const workouts = await Workout.find();
      if (!workouts || workouts.length === 0) {
        throw new CustomError('No workouts found', 404);
      }
      return workouts;
    } catch (error) {
      throw new CustomError('Failed to retrieve workouts', error.status || 500);
    }
  },

  getOne: async id => {
    try {
      const workout = await Workout.findById(id);
      if (!workout) {
        throw new CustomError('Workout not found', 404);
      }
      return workout;
    } catch (error) {
      throw new CustomError(`Failed to retrieve workout with id ${id}`, error.status || 500);
    }
  },

  create: async workoutData => {
    try {
      const workout = new Workout(workoutData);
      return await workout.save();
    } catch (error) {
      throw new CustomError('Failed to create workout', error.status || 500);
    }
  },

  update: async (id, workoutData) => {
    try {
      const workout = await Workout.findByIdAndUpdate(id, workoutData, { new: true });
      if (!workout) {
        throw new CustomError('Workout not found', 404);
      }
      return workout;
    } catch (error) {
      throw new CustomError(`Failed to update workout with id ${id}`, error.status || 500);
    }
  },

  delete: async id => {
    try {
      const workout = await Workout.findByIdAndDelete(id);
      if (!workout) {
        throw new CustomError('Workout not found', 404);
      }
      return { message: 'Workout deleted successfully' };
    } catch (error) {
      throw new CustomError(`Failed to delete workout with id ${id}`, error.status || 500);
    }
  },
};

export default workoutService;

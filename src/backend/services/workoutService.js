import Workout from '../models/workoutModel.js';
import CustomError from '../utils/customError.js';
import logger from '../config/logger.js';

const workoutService = {
  getAll: async () => {
    try {
      const workouts = await Workout.find();
      // Return empty array instead of throwing an error when no workouts are found
      return workouts || [];
    } catch (error) {
      logger.error(`Error in getAll: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
      });
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
      logger.error(`Error in getOne: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        id,
      });
      throw new CustomError(`Failed to retrieve workout with id ${id}`, error.status || 500);
    }
  },

  create: async workoutData => {
    try {
      // Validate required fields before creating
      const requiredFields = ['member', 'workoutType', 'duration', 'date', 'caloriesBurned'];
      const missingFields = requiredFields.filter(field => !workoutData[field]);
      
      if (missingFields.length > 0) {
        throw new CustomError(`Missing required fields: ${missingFields.join(', ')}`, 400);
      }
      
      // Validate numeric fields
      if (isNaN(workoutData.duration) || workoutData.duration < 1) {
        throw new CustomError('Duration must be a positive number', 400);
      }
      
      if (isNaN(workoutData.caloriesBurned) || workoutData.caloriesBurned < 0) {
        throw new CustomError('Calories burned must be a non-negative number', 400);
      }
      
      // Validate date
      const dateObj = new Date(workoutData.date);
      if (isNaN(dateObj.getTime())) {
        throw new CustomError('Invalid date format', 400);
      }
      
      // Create the workout with validated data
      const workout = new Workout(workoutData);
      return await workout.save();
    } catch (error) {
      // If it's already a CustomError, just pass it through
      if (error instanceof CustomError) {
        throw error;
      }
      
      // Log the detailed error for debugging
      logger.error(`Error creating workout: ${error.message}`, {
        stack: error.stack,
        data: workoutData
      });
      
      throw new CustomError('Failed to create workout', error.status || 500);
    }
  },

  update: async (id, workoutData) => {
    try {
      // Validate numeric fields if provided
      if (workoutData.duration !== undefined && (isNaN(workoutData.duration) || workoutData.duration < 1)) {
        throw new CustomError('Duration must be a positive number', 400);
      }
      
      if (workoutData.caloriesBurned !== undefined && (isNaN(workoutData.caloriesBurned) || workoutData.caloriesBurned < 0)) {
        throw new CustomError('Calories burned must be a non-negative number', 400);
      }
      
      // Validate date if provided
      if (workoutData.date) {
        const dateObj = new Date(workoutData.date);
        if (isNaN(dateObj.getTime())) {
          throw new CustomError('Invalid date format', 400);
        }
      }
      
      const workout = await Workout.findByIdAndUpdate(id, workoutData, { new: true });
      if (!workout) {
        throw new CustomError('Workout not found', 404);
      }
      return workout;
    } catch (error) {
      // If it's already a CustomError, just pass it through
      if (error instanceof CustomError) {
        throw error;
      }
      
      logger.error(`Error updating workout: ${error.message}`, {
        stack: error.stack,
        id,
        data: workoutData
      });
      
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
      logger.error(`Error deleting workout: ${error.message}`, {
        stack: error.stack,
        id
      });
      throw new CustomError(`Failed to delete workout with id ${id}`, error.status || 500);
    }
  },
};

export default workoutService;

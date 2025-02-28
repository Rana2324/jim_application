import workoutDb from '../database/workoutDb.js';
import CustomError from '../utils/customError.js';


const WorkoutService = {
    getAll: async () => {
        try {
            return await workoutDb.getAll();
        } catch (error) {
            throw new CustomError('Failed to retrieve workouts', error.status || 500);
        }
    },

    getOne: async (workoutId) => {
        try {
            return await workoutDb.getOne(workoutId);
        } catch (error) {
            throw new CustomError(`Failed to retrieve workout with id ${workoutId}`, error.status || 500);
        }
    },

    create: async (data) => {
        try {
            return await workoutDb.create(data);
        } catch (error) {
            throw new CustomError('Failed to create workout', error.status || 500);
        }
    },

    update: async (workoutId, data) => {
        try {
            return await workoutDb.update(workoutId, data);
        } catch (error) {
            throw new CustomError(`Failed to update workout with id ${workoutId}`, error.status || 500);
        }
    },

    delete: async (workoutId) => {
        try {
            await workoutDb.delete(workoutId);
            return { message: 'Workout deleted' };
        } catch (error) {
            throw new CustomError(`Failed to delete workout with id ${workoutId}`, error.status || 500);
        }
    }
};

export default WorkoutService;

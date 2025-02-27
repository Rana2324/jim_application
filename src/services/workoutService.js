import workoutDb from '../database/workoutDb.js';
import CustomError from '../utils/customError.js';

const WorkoutService = {
    getAll: async () => {
        try {
            const workouts = await workoutDb.getAll();
            return workouts;
        } catch (error) {
            throw new CustomError('Failed to retrieve workouts', error.status || 500);
        }
    },

    getOne: async (id) => {
        try {
            const workout = await workoutDb.getOne(id);
            return workout;
        } catch (error) {
            throw new CustomError(`Failed to retrieve workout with id ${id}`, error.status || 500);
        }
    },

    create: async (data) => {
        try {
            const workout = await workoutDb.create(data);
            return workout;
        } catch (error) {
            throw new CustomError('Failed to create workout', error.status || 500);
        }
    },

    update: async (id, data) => {
        try {
            const workout = await workoutDb.update(id, data);
            return workout;
        } catch (error) {
            throw new CustomError(`Failed to update workout with id ${id}`, error.status || 500);
        }
    },

    delete: async (id) => {
        try {
            await workoutDb.delete(id);
            return { message: 'Workout deleted' };
        } catch (error) {
            throw new CustomError(`Failed to delete workout with id ${id}`, error.status || 500);
        }
    }
};

export default WorkoutService;

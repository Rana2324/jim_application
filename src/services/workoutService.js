// import * as workoutDb from '../database/workoutDb.js';
import CustomError from "../utils/customError.js";

const workoutService = {
    getAll: async () => {
        try {
            return await workoutDb.findAll();
        } catch (error) {
            throw new CustomError('Failed to retrieve workouts', error.status || 500);
        }
    },

    getOne: async (id) => {
        try {
            const workout = await workoutDb.findById(id);
            if (!workout) {
                throw new CustomError('Workout not found', 404);
            }
            return workout;
        } catch (error) {
            throw new CustomError(`Failed to retrieve workout with id ${id}`, error.status || 500);
        }
    },

    create: async (workoutData) => {
        try {
            return await workoutDb.create(workoutData);
        } catch (error) {
            throw new CustomError('Failed to create workout', error.status || 500);
        }
    },

    update: async (id, workoutData) => {
        try {
            const workout = await workoutDb.update(id, workoutData);
            if (!workout) {
                throw new CustomError('Workout not found', 404);
            }
            return workout;
        } catch (error) {
            throw new CustomError(`Failed to update workout with id ${id}`, error.status || 500);
        }
    },

    delete: async (id) => {
        try {
            const workout = await workoutDb.remove(id);
            if (!workout) {
                throw new CustomError('Workout not found', 404);
            }
            return { message: 'Workout deleted successfully' };
        } catch (error) {
            throw new CustomError(`Failed to delete workout with id ${id}`, error.status || 500);
        }
    }
};

export default workoutService;

import Database from '../database/workoutDb.js';

// services/workoutService.js
const WorkoutService = {
    // Get all workouts
    getAll: async () => {
        try {
            const workouts = await Database.getAll();
            return workouts;
        } catch (error) {
            // Log error and throw it with additional context
            console.error('Error fetching workouts:', error.message);
            throw new Error('Failed to retrieve workouts');
        }
    },

    // Get one workout
    getOne: async (id) => {
        try {
            const workout = await Database.getOne(id);
            if (!workout) {
                const error = new Error('Workout not found');
                error.status = 404; // Custom status code for "not found"
                throw error;
            }
            return workout;
        } catch (error) {
            // Log error and throw it with additional context
            console.error(`Error fetching workout with id ${id}:`, error.message);
            throw error; // Re-throw the error to be handled by the error handler
        }
    },

    // Create new workout
    create: async (data) => {
        try {
            const workout = await Database.create(data);
            return workout;
        } catch (error) {
            console.error('Error creating workout:', error.message);
            throw new Error('Failed to create workout');
        }
    },

    // Update workout
    update: async (id, data) => {
        try {
            const workout = await Database.update(id, data);
            if (!workout) {
                const error = new Error('Workout not found');
                error.status = 404; // Custom status code for "not found"
                throw error;
            }
            return workout;
        } catch (error) {
            console.error(`Error updating workout with id ${id}:`, error.message);
            throw error; // Re-throw the error
        }
    },

    // Delete workout
    delete: async (id) => {
        try {
            const success = await Database.delete(id);
            if (!success) {
                const error = new Error('Workout not found');
                error.status = 404; // Custom status code for "not found"
                throw error;
            }
            return true;
        } catch (error) {
            console.error(`Error deleting workout with id ${id}:`, error.message);
            throw error; // Re-throw the error
        }
    }
};

export default WorkoutService;

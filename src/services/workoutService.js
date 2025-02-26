import Database from '../database/database.js';

/**
 * Service layer for workout business logic
 */
const WorkoutService = {
    // Get all workouts
    getAll: async () => {
        return await Database.getAll();
    },

    // Get one workout
    getOne: async (id) => {
        const workout = await Database.getOne(id);
        if (!workout) throw new Error('Not found');
        return workout;
    },

    // Create new workout
    create: async (data) => {
        return await Database.create(data);
    },

    // Update workout
    update: async (id, data) => {
        const workout = await Database.update(id, data);
        if (!workout) throw new Error('Not found');
        return workout;
    },

    // Delete workout
    delete: async (id) => {
        const success = await Database.delete(id);
        if (!success) throw new Error('Not found');
        return true;
    }
};

export default WorkoutService;


import DbUtils from './dbUtils.js';

// Workout database operations
const Database = {
    // Get all workouts
    getAll: async () => {
        return await DbUtilsread();
    },

    // Get one workout
    getOne: async (id) => {
        const workouts = await DbUtils.read();
        return workouts.find(w => w.id === id);
    },

    // Create workout
    create: async (data) => {
        const workouts = await DbUtils.read();

        const workout = {
            id: DbUtils.createId(),
            ...data,
            createdAt: DbUtils.timestamp(),
            updatedAt: DbUtils.timestamp()
        };

        workouts.push(workout);
        await DbUtils.save(workouts);
        return workout;
    },

    // Update workout
    update: async (id, data) => {
        const workouts = await DbUtils.read();
        const index = workouts.findIndex(w => w.id === id);

        if (index === -1) return null;

        const workout = {
            ...workouts[index],
            ...data,
            updatedAt: DbUtils.timestamp()
        };

        workouts[index] = workout;
        await DbUtils.save(workouts);
        return workout;
    },

    // Delete workout
    delete: async (id) => {
        const workouts = await DbUtils.read();
        const index = workouts.findIndex(w => w.id === id);

        if (index === -1) return false;

        workouts.splice(index, 1);
        await DbUtils.save(workouts);
        return true;
    }
};

export default Database; 
import CustomError from '../utils/customError.js';
import DbUtil from './dbUtils.js';

const workoutDb = {
    // Get all workouts
    getAll: async () => {
        try {
            // Fetch workouts from DB
            const workouts = await DbUtil.read();
            return workouts;
        } catch (error) {
            throw new CustomError('Error fetching workouts from DB', 500);
        }
    },

    // Get one workout by ID
    getOne: async (id) => {
        try {
            const workouts = await DbUtil.read(); // Read all workouts
            const workout = workouts.find(workout => workout.id === id); // Find the workout by ID
            if (!workout) {
                throw new CustomError('Workout not found', 404);
            }
            return workout;
        } catch (error) {
            throw new CustomError('Error fetching workout from DB', 500);
        }
    },

    // Create new workout
    create: async (data) => {
        try {
            // Assuming we need to add the new workout to the list
            const workouts = await DbUtil.read(); // Read current workouts
            const newWorkout = { ...data, id: DbUtil.createId(), createdAt: DbUtil.timestamp() };
            workouts.push(newWorkout); // Add the new workout
            await DbUtil.save(workouts); // Save the updated list
            return newWorkout;
        } catch (error) {
            throw new CustomError('Error creating workout in DB', 500);
        }
    },

    // Update workout by ID
    update: async (id, data) => {
        try {
            const workouts = await DbUtil.read(); // Read current workouts
            const index = workouts.findIndex(workout => workout.id === id); // Find workout by ID
            if (index === -1) {
                throw new CustomError('Workout not found', 404);
            }

            // Update the workout
            workouts[index] = { ...workouts[index], ...data, updatedAt: DbUtil.timestamp() };
            await DbUtil.save(workouts); // Save the updated list
            return workouts[index];
        } catch (error) {
            throw new CustomError('Error updating workout in DB', 500);
        }
    },

    // Delete workout by ID
    delete: async (id) => {
        try {
            const workouts = await DbUtil.read(); // Read current workouts
            const updatedWorkouts = workouts.filter(workout => workout.id !== id); // Remove workout by ID
            if (workouts.length === updatedWorkouts.length) {
                throw new CustomError('Workout not found', 404);
            }

            await DbUtil.save(updatedWorkouts); // Save the updated list
            return true; // Indicate success
        } catch (error) {
            throw new CustomError('Error deleting workout from DB', 500);
        }
    }
};

export default workoutDb;

import CustomError from "../utils/customError.js";
import dbUtils from "./dbUtils.js";

const workoutDb = {
  // Get all workouts
  getAll: async () => {
    try {
      return await dbUtils.read("workouts");
    } catch (error) {
      throw new CustomError("Error fetching workouts from DB", 500);
    }
  },

  // Get one workout by ID
  getOne: async (workoutId) => {
    try {
      const workouts = await dbUtils.read("workouts");
      const workout = workouts.find((workout) => workout.id === workoutId);
      if (!workout) {
        throw new CustomError("Workout not found", 404);
      }
      return workout;
    } catch (error) {
      throw new CustomError("Error fetching workout from DB", 500);
    }
  },

  // Create new workout
  create: async (data) => {
    try {
      const workouts = await dbUtils.read("workouts");
      const newWorkout = {
        ...data,
        id: dbUtils.createId(),
        createdAt: dbUtils.timestamp(),
      };
      workouts.push(newWorkout);
      await dbUtils.save("workouts", workouts);
      return newWorkout;
    } catch (error) {
      throw new CustomError("Error creating workout in DB", 500);
    }
  },

  // Update workout by ID
  update: async (workoutId, data) => {
    try {
      const workouts = await dbUtils.read("workouts");
      const index = workouts.findIndex((workout) => workout.id === workoutId);
      if (index === -1) {
        throw new CustomError("Workout not found", 404);
      }

      workouts[index] = {
        ...workouts[index],
        ...data,
        updatedAt: dbUtils.timestamp(),
      };
      await dbUtils.save("workouts", workouts);
      return workouts[index];
    } catch (error) {
      throw new CustomError("Error updating workout in DB", 500);
    }
  },

  // Delete workout by ID
  delete: async (workoutId) => {
    try {
      const workouts = await dbUtils.read("workouts");
      const index = workouts.findIndex((workout) => workout.id === workoutId);
      if (index === -1) {
        throw new CustomError(`Workout with ID ${workoutId} not found`, 404);
      }
      workouts.splice(index, 1);
      await dbUtils.save("workouts", workouts);

      return true;
    } catch (error) {
      throw new CustomError("Error deleting workout from DB", 500);
    }
  },
};

export default workoutDb;

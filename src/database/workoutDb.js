import CustomError from "../utils/customError.js";
import DbUtil from "./dbUtils.js";

const workoutDb = {
  // Get all workouts
  getAll: async () => {
    try {
      const workouts = await DbUtil.read();
      return workouts;
    } catch (error) {
      throw new CustomError("Error fetching workouts from DB", 500);
    }
  },

  // Get one workout by ID
  getOne: async (id) => {
    try {
      const workouts = await DbUtil.read();
      const workout = workouts.find((workout) => workout.id === id);
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
      const workouts = await DbUtil.read();
      const newWorkout = {
        ...data,
        id: DbUtil.createId(),
        createdAt: DbUtil.timestamp(),
      };
      workouts.push(newWorkout);
      await DbUtil.save(workouts);
      return newWorkout;
    } catch (error) {
      throw new CustomError("Error creating workout in DB", 500);
    }
  },

  // Update workout by ID
  update: async (id, data) => {
    try {
      const workouts = await DbUtil.read();
      const index = workouts.findIndex((workout) => workout.id === id);
      if (index === -1) {
        throw new CustomError("Workout not found", 404);
      }

      workouts[index] = {
        ...workouts[index],
        ...data,
        updatedAt: DbUtil.timestamp(),
      };
      await DbUtil.save(workouts);
      return workouts[index];
    } catch (error) {
      throw new CustomError("Error updating workout in DB", 500);
    }
  },

  // Delete workout by ID
  delete: async (id) => {
    try {
      const workouts = await DbUtil.read();
      const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
      if (workouts.length === updatedWorkouts.length) {
        console.error(`Workout with ID ${id} not found`);
        throw new CustomError(`Workout with ID ${id} not found`, 404);
      }
      await DbUtil.save(updatedWorkouts);
      return true;
    } catch (error) {
      throw new CustomError("Error deleting workout from DB", 500);
    }
  },
};

export default workoutDb;

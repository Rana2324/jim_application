import workoutService from '../services/workoutService.js';
import logger from '../config/logger.js';

const WorkoutController = {
  getAll: async (req, res, next) => {
    try {
      const workouts = await workoutService.getAll();
      if (!workouts || workouts.length === 0) {
        return res.status(404).json({
          ok: false,
          message: 'No workouts found',
        });
      }
      res.status(200).json({
        ok: true,
        message: 'Workouts fetched successfully',
        data: workouts,
      });
    } catch (error) {
      logger.error(`Error fetching workouts: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to fetch workouts',
      });
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { workoutId } = req.params;
      if (!workoutId) {
        return res.status(400).json({
          ok: false,
          message: 'Workout ID is required',
        });
      }
      const workout = await workoutService.getOne(workoutId);
      if (!workout) {
        return res.status(404).json({
          ok: false,
          message: 'Workout not found',
        });
      }
      res.status(200).json({
        ok: true,
        message: 'Workout fetched successfully',
        data: workout,
      });
    } catch (error) {
      logger.error(`Error fetching workout: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        workoutId: req.params.workoutId,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to fetch workout',
      });
    }
  },

  create: async (req, res, next) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          ok: false,
          message: 'Request body is required',
        });
      }
      const newWorkout = await workoutService.create(req.body);
      res.status(201).json({
        ok: true,
        message: 'Workout created successfully',
        data: newWorkout,
      });
    } catch (error) {
      logger.error(`Error creating workout: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        requestBody: req.body,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to create workout',
      });
    }
  },

  update: async (req, res, next) => {
    try {
      const { workoutId } = req.params;
      if (!workoutId) {
        return res.status(400).json({
          ok: false,
          message: 'Workout ID is required',
        });
      }
      const updatedWorkout = await workoutService.update(workoutId, req.body);
      if (!updatedWorkout) {
        return res.status(404).json({
          ok: false,
          message: 'Workout not found, cannot be updated',
        });
      }
      res.status(200).json({
        ok: true,
        message: 'Workout updated successfully',
        data: updatedWorkout,
      });
    } catch (error) {
      logger.error(`Error updating workout: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        workoutId: req.params.workoutId,
        requestBody: req.body,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to update workout',
      });
    }
  },

  delete: async (req, res, next) => {
    try {
      const { workoutId } = req.params;
      if (!workoutId) {
        return res.status(400).json({
          ok: false,
          message: 'Workout ID is required',
        });
      }
      const deletedWorkout = await workoutService.delete(workoutId);
      if (!deletedWorkout) {
        return res.status(404).json({
          ok: false,
          message: 'Workout not found, cannot be deleted',
        });
      }
      res.status(200).json({
        ok: true,
        message: 'Workout deleted successfully',
      });
    } catch (error) {
      logger.error(`Error deleting workout: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        workoutId: req.params.workoutId,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to delete workout',
      });
    }
  },
};

export default WorkoutController;

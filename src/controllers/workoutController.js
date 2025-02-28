import WorkoutService from "../services/workoutService.js";

const WorkoutController = {
  getAll: async (req, res, next) => {
    try {
      const workouts = await WorkoutService.getAll();
      res.json({
        ok: true,
        message: "Workouts fetched successfully",
        data: workouts
      });
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { workoutId } = req.params;
      if (!workoutId) {
        return res
          .status(400)
          .json({ ok: false, message: "Invalid workout ID" });
      }
      const workout = await WorkoutService.getOne(workoutId);
      res.json({ ok: true, message: "Workout fetched successfully", data: workout });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const workout = await WorkoutService.create(req.body);
      res.status(201).json({ ok: true, message: "Workout created successfully", data: workout });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const workout = await WorkoutService.update(req.params.workoutId, req.body);
      res.json({ ok: true, message: "Workout updated successfully", data: workout });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      await WorkoutService.delete(req.params.workoutId);
      res.json({ ok: true, message: "Workout deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default WorkoutController;

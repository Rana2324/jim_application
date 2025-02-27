import WorkoutService from "../services/workoutService.js";

const WorkoutController = {
  getAll: async (req, res, next) => {
    try {
      const workouts = await WorkoutService.getAll();
      res.json({ ok: true, data: workouts });
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ ok: false, message: "Invalid workout ID" });
      }
      const workout = await WorkoutService.getOne(id);
      res.json({ ok: true, data: workout });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      console.log("---", req.body);
      const workout = await WorkoutService.create(req.body);
      res.status(201).json({ ok: true, data: workout });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      console.log("---", req.params.id, req.body);
      const workout = await WorkoutService.update(req.params.id, req.body);
      res.json({ ok: true, data: workout });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      await WorkoutService.delete(req.params.id);
      res.json({ ok: true, message: "Workout deleted" });
    } catch (error) {
      next(error);
    }
  },
};

export default WorkoutController;

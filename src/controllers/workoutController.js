import WorkoutService from "../services/workoutService.js";

const WorkoutController = {
  getAll: async (req, res, next) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/workouts');
      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }
      const workouts = await response.json();
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
      const response = await fetch(`http://localhost:5000/api/v1/workouts/${workoutId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch workout details');
      }
      const workout = await response.json();
      res.json({ ok: true, message: "Workout fetched successfully", data: workout });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create workout');
      }
      
      const newWorkout = await response.json();
      res.status(201).json({ ok: true, message: "Workout created successfully", data: newWorkout });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/workouts/${req.params.workoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update workout');
      }
      
      const updatedWorkout = await response.json();
      res.json({ ok: true, message: "Workout updated successfully", data: updatedWorkout });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/workouts/${req.params.workoutId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete workout');
      }
      
      res.json({ ok: true, message: "Workout deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default WorkoutController;

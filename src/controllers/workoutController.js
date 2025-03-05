import workoutService from "../services/workoutService.js";

const WorkoutController = {
    getAll: async (req, res, next) => {
        try {
            const workouts = await workoutService.getAll();
            if (!workouts || workouts.length === 0) {
                return res.status(404).json({
                    ok: false,
                    message: "No workouts found",
                });
            }
            res.status(200).json({
                ok: true,
                message: "Workouts fetched successfully",
                data: workouts,
            });
        } catch (error) {
            console.error("Error in getAll:", error);
            next(error);
        }
    },

    getOne: async (req, res, next) => {
        try {
            const { workoutId } = req.params;
            if (!workoutId) {
                return res.status(400).json({
                    ok: false,
                    message: "Workout ID is required",
                });
            }
            const workout = await workoutService.getOne(workoutId);
            if (!workout) {
                return res.status(404).json({
                    ok: false,
                    message: "Workout not found",
                });
            }
            res.status(200).json({
                ok: true,
                message: "Workout fetched successfully",
                data: workout,
            });
        } catch (error) {
            console.error("Error in getOne:", error);
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    ok: false,
                    message: "Request body is required",
                });
            }
            const newWorkout = await workoutService.create(req.body);
            res.status(201).json({
                ok: true,
                message: "Workout created successfully",
                data: newWorkout,
            });
        } catch (error) {
            console.error("Error in create:", error);
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { workoutId } = req.params;
            if (!workoutId) {
                return res.status(400).json({
                    ok: false,
                    message: "Workout ID is required",
                });
            }
            const updatedWorkout = await workoutService.update(workoutId, req.body);
            if (!updatedWorkout) {
                return res.status(404).json({
                    ok: false,
                    message: "Workout not found, cannot be updated",
                });
            }
            res.status(200).json({
                ok: true,
                message: "Workout updated successfully",
                data: updatedWorkout,
            });
        } catch (error) {
            console.error("Error in update:", error);
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { workoutId } = req.params;
            if (!workoutId) {
                return res.status(400).json({
                    ok: false,
                    message: "Workout ID is required",
                });
            }
            const deletedWorkout = await workoutService.delete(workoutId);
            if (!deletedWorkout) {
                return res.status(404).json({
                    ok: false,
                    message: "Workout not found, cannot be deleted",
                });
            }
            res.status(200).json({
                ok: true,
                message: "Workout deleted successfully",
            });
        } catch (error) {
            console.error("Error in delete:", error);
            next(error);
        }
    },
};

export default WorkoutController;

// Let me know if you want any adjustments or enhancements! 🚀

import * as workoutService from "../services/workoutService.js";

//allWorkouteController

export const allWorkouteController = async (req, res) => {
    try {

        const allWorkouts = await workoutService.allWorkoutService();

        if (!allWorkouts) {
            throw {
                status: 404,
                message: 'No workouts found'
            }
        }
        res.status(200).send({
            status: "success",
            message: " All workouts retrieved successfully",
            data: allWorkouts
        }
        )

    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Failed to get all workouts"
        })
    }
}

//singleWorkouteController
export const singleWorkouteController = async (req, res) => {
    try {
        const { workoutId } = req.params;
        const workout = await workoutService.singleWorkoutService(workoutId);
        if (!workout) {
            throw {
                status: 404,
                message: 'Workout not found'
            }
        }
        res.status(200).send({
            status: "success",
            message: "Workout retrieved successfully ",
            data: workout
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Failed to get workout"
        })
    }
}

//createWorkouteController

export const createWorkouteController = async (req, res) => {
    try {
        const workoutData = req.body;
        const newWorkout = await workoutService.createWorkoutService(workoutData);
        if (!newWorkout) {
            throw {
                status: 404,
                message: 'Workout not created'
            }
        }
        res.status(201).send({
            status: "success",
            message: "Workout created successfully",
            data: newWorkout
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Failed to create workout"
        })
    }
}

//updateWorkouteController

export const updateWorkouteController = async (req, res) => {
    try {

        const { workoutId } = req.params;
        const workoutData = req.body;
        const updatedWorkout = await workoutService.updateWorkoutService(workoutId, workoutData);

        if (!updatedWorkout) {
            throw {
                status: 404,
                message: 'Workout not updated'
            }
        }
        res.status(200).send({
            status: "success",
            message: "Workout updated successfully",
            data: updatedWorkout
        })
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Failed to update workout"
        })
    }
}

//deleteWorkouteController

export const deleteWorkouteController = async (req, res) => {
    try {
        const { workoutId } = req.params;
        const deletedWorkout = await workoutService.deleteWorkoutService(workoutId);

        res.status(200).send({
            status: "success",
            message: "Workout deleted successfully",
            data: deletedWorkout
        });
    } catch (error) {
        res.status(error.status || 500).send({
            status: "Failed",
            message: error.message || "Error deleting workout"
        });
    }
}
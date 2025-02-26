import * as workoutDb from "../database/workoutDb.js";



// Get all workouts
export async function allWorkoutService() {
    try {
        const allWorkouts = await workoutDb.allWorkouts();
        if (!allWorkouts) {
            throw {
                status: 404,
                message: 'No workouts found'
            }
        }
        return allWorkouts;

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    }
}

// Get a single workout
export async function singleWorkoutService(workoutId) {
    try {
        const singleWorkout = await workoutDb.singleWorkout(workoutId);
        if (!singleWorkout) {
            throw {
                status: 404,
                message: 'Workout not found'
            }
        }
        return singleWorkout;

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    }

}

// Create a new workout
export async function createWorkoutService(workoutData) {
    try {
        const newWorkout = await workoutDb.createWorkout(workoutData);
        if (!newWorkout) {
            throw {
                status: 404,
                message: 'Workout not created'
            }
        }
        return newWorkout;

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    }


}


// Update a workout
export async function updateWorkoutService(workoutId, workoutData) {
    try {
        const updateWorkout = await workoutDb.updateWorkout(workoutId, workoutData)
        if (!updateWorkout) {
            throw {
                status: 404,
                message: 'Workout not updated'
            }
        }
        return updateWorkout;

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    }

}


// Delete a workout
export async function deleteWorkoutService(workoutId) {
    try {
        const deletedWorkout = await workoutDb.deleteWorkout(workoutId);
        return deletedWorkout;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Error deleting workout'
        }
    }
}


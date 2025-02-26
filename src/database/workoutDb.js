import * as dbUtils from "./dbUtils.js";

//get all workouts from the json data
export const allWorkouts = async () => {
    try {
        const workouts = await dbUtils.readDbData();

        if (!workouts) {
            throw {
                status: 404,
                message: 'No workouts found'
            }
        }
        return workouts;

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    }
}

//get a single workout from the json data
export const singleWorkout = async (workoutId) => {
    try {
        const workouts = await dbUtils.readDbData();
        const singleWorkout = workouts.find(workout => workout.id === workoutId);
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

//create a new workout
export const createWorkout = async (workoutData) => {
    try {
        // Validate workout data
        dbUtils.validateWorkoutData(workoutData);

        const workouts = await dbUtils.readDbData();

        // Create new workout with timestamp
        const newWorkout = {
            id: dbUtils.generateId(),
            ...workoutData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        workouts.push(newWorkout);
        await dbUtils.writeDbData(workouts);
        return newWorkout;

    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    }
}

//update a workout
export const updateWorkout = async (workoutId, workoutData) => {

    try {
        const workouts = await dbUtils.readDbData();
        const workoutIndex = workouts.findIndex(workout => workout.id == workoutId);
        if (workoutIndex === -1) {
            throw {
                status: 404,
                message: 'Workout not found'
            }
        }

        const updatedWorkout = {
            ...workouts[workoutIndex],
            ...workoutData,
            updatedAt: new Date().toISOString()
        }
        workouts[workoutIndex] = updatedWorkout;
        await dbUtils.writeDbData(workouts);
        return updatedWorkout;


    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    }

}

//delete a workout
export const deleteWorkout = async (workoutId) => {
    try {
        const workouts = await dbUtils.readDbData();
        const workoutIndex = workouts.findIndex(workout => workout.id === workoutId);

        if (workoutIndex === -1) {
            throw {
                status: 404,
                message: 'Workout not found'
            }
        }

        workouts.splice(workoutIndex, 1);
        await dbUtils.writeDbData(workouts);
        return {
            status: "OK",
            message: "Workout deleted successfully"
        };
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    }
}   
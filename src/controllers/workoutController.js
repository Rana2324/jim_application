import WorkoutService from '../services/workoutService.js';

/**
 * Workout Controller
 * Handles all HTTP requests for workout operations
 */
const WorkoutController = {
    // Get all workouts
    getAll: async (req, res) => {
        try {
            const workouts = await WorkoutService.getAll();
            res.json({ ok: true, data: workouts });
        } catch (error) {
            res.status(500).json({ ok: false, error: 'Could not get workouts' });
        }
    },

    // Get one workout
    getOne: async (req, res) => {
        try {
            const workout = await WorkoutService.getOne(req.params.id);
            res.json({ ok: true, data: workout });
        } catch (error) {
            res.status(404).json({ ok: false, error: 'Workout not found' });
        }
    },

    // Create new workout
    create: async (req, res) => {
        try {
            const workout = await WorkoutService.create(req.body);
            res.status(201).json({ ok: true, data: workout });
        } catch (error) {
            res.status(400).json({ ok: false, error: 'Could not create workout' });
        }
    },

    // Update workout
    update: async (req, res) => {
        try {
            const workout = await WorkoutService.update(req.params.id, req.body);
            res.json({ ok: true, data: workout });
        } catch (error) {
            res.status(404).json({ ok: false, error: 'Workout not found' });
        }
    },

    // Delete workout
    delete: async (req, res) => {
        try {
            await WorkoutService.delete(req.params.id);
            res.json({ ok: true, message: 'Workout deleted' });
        } catch (error) {
            res.status(404).json({ ok: false, error: 'Workout not found' });
        }
    }
};

export default WorkoutController;
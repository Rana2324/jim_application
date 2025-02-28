import WorkoutService from '../services/workoutService.js';

const WorkoutController = {
    getAll: async (req, res, next) => {
        try {
            const workouts = await WorkoutService.getAll();
            res.json({
                ok: true,
                message: 'Workouts retrieved',
                data: workouts

            })
           
        } catch (error) {
            next(error); // Pass error to the next middleware (error handler)
        }
    },

    getOne: async (req, res, next) => {
        try {
            const workout = await WorkoutService.getOne(req.params.id);
            res.json({ ok: true,message: 'Workout retrieved', data: workout });
        } catch (error) {
            next(error); // Pass error to the next middleware (error handler)
        }
    },

    create: async (req, res, next) => {
        try {
            const workout = await WorkoutService.create(req.body);
            res.status(201).json({ ok: true,message: 'Workout created', data: workout });
        } catch (error) {
            next(error); // Pass error to the next middleware (error handler)
        }
    },

    update: async (req, res, next) => {
        try {
            const workout = await WorkoutService.update(req.params.id, req.body);
            res.json({ ok: true,message: 'Workout updated', data: workout });
        } catch (error) {
            next(error); // Pass error to the next middleware (error handler)
        }
    },

    delete: async (req, res, next) => {
        try {
            await WorkoutService.delete(req.params.id);
            res.json({ ok: true, message: 'Workout deleted' });
        } catch (error) {
            next(error); // Pass error to the next middleware (error handler)
        }
    }
};

export default WorkoutController;

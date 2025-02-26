import { Router } from 'express';
import workoutRoutes from './workoutRoutes.js';

// Create main router
const router = Router();

// Connect workout routes
router.use('/workout', workoutRoutes);

export default router;

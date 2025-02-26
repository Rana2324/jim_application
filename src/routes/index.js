import express from 'express';
import workoutRoutes from "./workoutRoutes.js";

// Constants
const router = express.Router();

// Routes
router.use("/workout", workoutRoutes);

export default router;

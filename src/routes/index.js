import { Router } from "express";
import workoutRoutes from "./workoutRoutes.js";
import memberRoutes from "./memberRoutes.js";

// Create main router
const router = Router();

// Connect workout routes
router.use("/workouts", workoutRoutes);
//Connect member routes
router.use("/members", memberRoutes);

export default router;

import { Router } from "express";
import workoutRoutes from "./workoutRoutes.js";
import memberRoutes from "./memberRoutes.js";
import recordRoutes from "./recordRoutes.js";

// Create main router
const router = Router();

// Connect workout routes
router.use("/workouts", workoutRoutes);
//Connect member routes
router.use("/members", memberRoutes);
// Connect record routes
router.use('/records', recordRoutes);

export default router;

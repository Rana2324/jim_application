import { Router } from "express";
import workoutRoutes from "./workoutRoutes.js";
import memberRoutes from "./memberRoutes.js";

// Create main router
const router = Router();

// Connect workout routes
router.use("/workout", workoutRoutes);
//Connect member routes
router.use("/member", memberRoutes);

export default router;

import { Router } from "express";
import WorkoutController from "../controllers/workoutController.js";

// Create workout router
const router = Router();

// Basic CRUD routes
router.get("/", WorkoutController.getAll);
router.get("/:workoutId", WorkoutController.getOne);
router.post("/", WorkoutController.create);
router.patch("/:workoutId", WorkoutController.update);
router.delete("/:workoutId", WorkoutController.delete);



export default router;

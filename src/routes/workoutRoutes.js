import { Router } from "express";
import WorkoutController from "../controllers/workoutController.js";

// Create workout router
const router = Router();

// Basic CRUD routes
router.get("/", WorkoutController.getAll);
router.get("/:id", WorkoutController.getOne);
// router.post("/", WorkoutController.create);
// router.put("/update/:id", WorkoutController.update);
router.delete("/:id", WorkoutController.delete);

router.post("/", WorkoutController.create);
router.patch("/:id", WorkoutController.update);

export default router;

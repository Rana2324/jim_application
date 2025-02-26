import express from 'express';
import * as workoutController from "../controllers/workoutController.js";

// Constants
const router = express.Router();

// Routes for workouts
router.get("/", workoutController.allWorkouteController);
router.get("/:workoutId", workoutController.singleWorkouteController);
router.post("/", workoutController.createWorkouteController);
router.patch("/:workoutId", workoutController.updateWorkouteController);
router.delete("/:workoutId", workoutController.deleteWorkouteController);

export default router;

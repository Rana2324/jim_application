import { Router } from "express";
import memberController from "../controllers/memberController.js";

//call the router

const router = Router();

//basic routes
router.get("/", memberController.getAll);
router.get("/:memberId", memberController.getOne);
router.post("/", memberController.create);
router.patch("/:memberId", memberController.update);
router.delete("/:memberId", memberController.delete);

export default router;

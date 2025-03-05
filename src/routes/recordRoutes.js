import { Router } from "express";

//call the router

const router = Router();

//basic routes
router.get("/", memberController.getAll);
router.get("/:recordId", memberController.getOne);
router.post("/", memberController.create);
router.patch("/:recordId", memberController.update);
router.delete("/:recordId", memberController.delete);

export default router;

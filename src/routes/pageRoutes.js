import { Router } from "express";


const router = Router();

// Static page routes
router.get("/", (req, res) => {
    res.render("home");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/workouts", (req, res) => {
    res.render("workouts");
});

router.get("/records", (req, res) => {
    res.render("records");
});

router.get("/members", (req, res) => {
    res.render("members");
});



// Member management page
// router.get("/members", memberController.getAll);


export default router;

import { Router } from 'express';
import memberViewController from '../controllers/memberViewController.js';
import workoutViewController from '../controllers/workoutViewController.js';
import recordViewController from '../controllers/recordViewController.js';

const router = Router();

// Static page routes
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

// Updated routes to use controllers to fetch data and render views
router.get('/workouts', workoutViewController.renderAllWorkouts);
router.get('/workouts/:workoutId', workoutViewController.renderWorkoutDetails);

router.get('/records', recordViewController.renderAllRecords);
router.get('/records/:recordId', recordViewController.renderRecordDetails);

// Member routes with controllers
router.get('/members', memberViewController.renderAllMembers);
// The more specific route must come before the generic route
router.get('/members/edit/:memberId', memberViewController.renderEditMemberForm);
router.get('/members/:memberId', memberViewController.renderMemberDetails);

export default router;

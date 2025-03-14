import workoutService from '../../backend/services/workoutService.js';
import memberService from '../../backend/services/memberService.js';
import logger from '../../backend/config/logger.js';

// Workout View Controller - For rendering EJS views with workout data
const workoutViewController = {
  // Render all workouts page
  renderAllWorkouts: async (req, res, next) => {
    try {
      // Fetch all workouts and members from the database
      const [workouts, members] = await Promise.all([
        workoutService.getAll(),
        memberService.getAll()
      ]);
      
      // Render the workouts view with the data
      res.render('workouts', { 
        title: 'All Workouts',
        workouts: workouts || [], 
        members: members || [],
        message: workouts.length > 0 ? null : 'No workouts found' 
      });
    } catch (error) {
      logger.error(`Error rendering workouts page: ${error.message}`, {
        stack: error.stack
      });
      // Render error page instead of passing to next middleware
      res.status(500).render('error', { 
        message: 'Error loading workouts. Please try again later.' 
      });
    }
  },

  // Render single workout details page
  renderWorkoutDetails: async (req, res, next) => {
    try {
      const { workoutId } = req.params;
      
      if (!workoutId) {
        return res.status(400).render('error', { 
          message: 'Workout ID is required' 
        });
      }

      // Fetch the specific workout from the database
      const workout = await workoutService.getOne(workoutId);
      
      if (!workout) {
        return res.status(404).render('error', { 
          message: 'Workout not found' 
        });
      }

      // Render the workout details view with the data
      res.render('workoutDetails', { 
        title: 'Workout Details',
        workout: workout 
      });
    } catch (error) {
      logger.error(`Error rendering workout details: ${error.message}`, {
        stack: error.stack,
        workoutId: req.params.workoutId
      });
      // Render error page instead of passing to next middleware
      res.status(500).render('error', { 
        message: 'Error loading workout details. Please try again later.' 
      });
    }
  }
};

export default workoutViewController;

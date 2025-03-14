import recordService from '../../backend/services/recordService.js';
import memberService from '../../backend/services/memberService.js';
import workoutService from '../../backend/services/workoutService.js';
import logger from '../../backend/config/logger.js';

// Record View Controller - For rendering EJS views with record data
const recordViewController = {
  // Render all records page
  renderAllRecords: async (req, res, next) => {
    try {
      // Fetch all records, members, and workouts from the database
      const [records, members, workouts] = await Promise.all([
        recordService.getAll(),
        memberService.getAll(),
        workoutService.getAll()
      ]);
      
      // Render the records view with the data
      res.render('records', { 
        title: 'All Records',
        records: records || [], 
        members: members || [],
        workouts: workouts || [],
        message: records.length > 0 ? null : 'No records found' 
      });
    } catch (error) {
      logger.error(`Error rendering records page: ${error.message}`, {
        stack: error.stack
      });
      // Render error page instead of passing to next middleware
      res.status(500).render('error', { 
        message: 'Error loading records. Please try again later.' 
      });
    }
  },

  // Render single record details page
  renderRecordDetails: async (req, res, next) => {
    try {
      const { recordId } = req.params;
      
      if (!recordId) {
        return res.status(400).render('error', { 
          message: 'Record ID is required' 
        });
      }

      // Fetch the specific record from the database
      const record = await recordService.getOne(recordId);
      
      if (!record) {
        return res.status(404).render('error', { 
          message: 'Record not found' 
        });
      }

      // Render the record details view with the data
      res.render('recordDetails', { 
        title: 'Record Details',
        record: record 
      });
    } catch (error) {
      logger.error(`Error rendering record details: ${error.message}`, {
        stack: error.stack,
        recordId: req.params.recordId
      });
      // Render error page instead of passing to next middleware
      res.status(500).render('error', { 
        message: 'Error loading record details. Please try again later.' 
      });
    }
  }
};

export default recordViewController;

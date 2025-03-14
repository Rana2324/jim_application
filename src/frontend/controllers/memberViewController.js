import memberService from '../../backend/services/memberService.js';
import logger from '../../backend/config/logger.js';

// Member View Controller - For rendering EJS views with member data
const memberViewController = {
  // Render all members page
  renderAllMembers: async (req, res, next) => {
    try {
      // Fetch all members from the database
      const members = await memberService.getAll();
      
      // Render the members view with the data
      res.render('members', { 
        title: 'All Members',
        members: members || [], 
        message: members.length > 0 ? null : 'No members found' 
      });
    } catch (error) {
      logger.error(`Error rendering members page: ${error.message}`, {
        stack: error.stack
      });
      // Render error page instead of passing to next middleware
      res.status(500).render('error', { 
        message: 'Error loading members. Please try again later.' 
      });
    }
  },

  // Render single member details page
  renderMemberDetails: async (req, res, next) => {
    try {
      const { memberId } = req.params;
      
      if (!memberId) {
        return res.status(400).render('error', { 
          message: 'Member ID is required' 
        });
      }

      // Fetch the specific member from the database
      const member = await memberService.getOne(memberId);
      
      if (!member) {
        return res.status(404).render('error', { 
          message: 'Member not found' 
        });
      }

      // Render the member details view with the data
      res.render('memberDetails', { 
        title: 'Member Details',
        member: member 
      });
    } catch (error) {
      logger.error(`Error rendering member details: ${error.message}`, {
        stack: error.stack,
        memberId: req.params.memberId
      });
      // Render error page instead of passing to next middleware
      res.status(500).render('error', { 
        message: 'Error loading member details. Please try again later.' 
      });
    }
  },

  // Render edit member form
  renderEditMemberForm: async (req, res, next) => {
    try {
      const { memberId } = req.params;
      
      if (!memberId) {
        return res.status(400).render('error', { 
          message: 'Member ID is required' 
        });
      }

      // Fetch the specific member from the database
      const member = await memberService.getOne(memberId);
      
      if (!member) {
        return res.status(404).render('error', { 
          message: 'Member not found' 
        });
      }

      // Render the edit member form with the data
      res.render('memberEdit', { 
        title: 'Edit Member',
        member: member 
      });
    } catch (error) {
      logger.error(`Error rendering edit member form: ${error.message}`, {
        stack: error.stack,
        memberId: req.params.memberId
      });
      // Render error page instead of passing to next middleware
      res.status(500).render('error', { 
        message: 'Error loading edit form. Please try again later.' 
      });
    }
  }
};

export default memberViewController;

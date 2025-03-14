import memberService from '../services/memberService.js';
import logger from '../config/logger.js';

// member controller
const memberController = {
  getAll: async (req, res, next) => {
    try {
      const members = await memberService.getAll();
      if (!members || members.length === 0) {
        return res.status(404).json({
          ok: false,
          message: 'No members found',
        });
      }
      res.json({
        ok: true,
        message: 'Members fetched successfully',
        data: members,
      });
    } catch (error) {
      logger.error(`Error fetching members: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to fetch members',
      });
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { memberId } = req.params;
      if (!memberId) {
        return res.status(400).json({
          ok: false,
          message: 'Member ID is required',
        });
      }

      const member = await memberService.getOne(memberId);
      if (!member) {
        return res.status(404).json({
          ok: false,
          message: 'Member not found',
        });
      }

      res.json({
        ok: true,
        message: 'Member fetched successfully',
        data: member,
      });
    } catch (error) {
      logger.error(`Error fetching member: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        memberId: req.params.memberId,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to fetch member',
      });
    }
  },

  create: async (req, res, next) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          ok: false,
          message: 'Request body cannot be empty',
        });
      }

      const newMember = await memberService.create(req.body);
      res.status(201).json({
        ok: true,
        message: 'Member created successfully',
        data: newMember,
      });
    } catch (error) {
      logger.error(`Error creating member: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        requestBody: req.body,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to create member',
      });
    }
  },
  
  update: async (req, res, next) => {
    try {
      const { memberId } = req.params;
      if (!memberId) {
        return res.status(400).json({
          ok: false,
          message: 'Member ID is required',
        });
      }

      const updatedMember = await memberService.update(memberId, req.body);
      if (!updatedMember) {
        return res.status(404).json({
          ok: false,
          message: 'Member not found',
        });
      }

      res.json({
        ok: true,
        message: 'Member updated successfully',
        data: updatedMember,
      });
    } catch (error) {
      logger.error(`Error updating member: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        memberId: req.params.memberId,
        requestBody: req.body,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to update member',
      });
    }
  },

  delete: async (req, res, next) => {
    try {
      const { memberId } = req.params;
      if (!memberId) {
        return res.status(400).json({
          ok: false,
          message: 'Member ID is required',
        });
      }

      const deletedMember = await memberService.delete(memberId);
      if (!deletedMember) {
        return res.status(404).json({
          ok: false,
          message: 'Member not found',
        });
      }

      res.json({
        ok: true,
        message: 'Member deleted successfully',
      });
    } catch (error) {
      logger.error(`Error deleting member: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        memberId: req.params.memberId,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to delete member',
      });
    }
  },
};

export default memberController;

import recordService from '../services/recordService.js';
import logger from '../config/logger.js';

// record controller
const recordController = {
  getAll: async (req, res, next) => {
    try {
      const records = await recordService.getAll();
      if (!records || records.length === 0) {
        return res.status(404).json({
          ok: false,
          message: 'No records found',
        });
      }
      res.json({
        ok: true,
        message: 'Records fetched successfully',
        data: records,
      });
    } catch (error) {
      logger.error(`Error fetching records: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to fetch records',
      });
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { recordId } = req.params;
      if (!recordId) {
        return res.status(400).json({
          ok: false,
          message: 'Record ID is required',
        });
      }

      const record = await recordService.getOne(recordId);
      if (!record) {
        return res.status(404).json({
          ok: false,
          message: 'Record not found',
        });
      }

      res.json({
        ok: true,
        message: 'Record fetched successfully',
        data: record,
      });
    } catch (error) {
      logger.error(`Error fetching record: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        recordId: req.params.recordId,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to fetch record',
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

      const newRecord = await recordService.create(req.body);
      res.status(201).json({
        ok: true,
        message: 'Record created successfully',
        data: newRecord,
      });
    } catch (error) {
      logger.error(`Error creating record: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        requestBody: req.body,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to create record',
      });
    }
  },
  
  update: async (req, res, next) => {
    try {
      const { recordId } = req.params;
      if (!recordId) {
        return res.status(400).json({
          ok: false,
          message: 'Record ID is required',
        });
      }

      const updatedRecord = await recordService.update(recordId, req.body);
      if (!updatedRecord) {
        return res.status(404).json({
          ok: false,
          message: 'Record not found',
        });
      }

      res.json({
        ok: true,
        message: 'Record updated successfully',
        data: updatedRecord,
      });
    } catch (error) {
      logger.error(`Error updating record: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        recordId: req.params.recordId,
        requestBody: req.body,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to update record',
      });
    }
  },

  delete: async (req, res, next) => {
    try {
      const { recordId } = req.params;
      if (!recordId) {
        return res.status(400).json({
          ok: false,
          message: 'Record ID is required',
        });
      }

      const deletedRecord = await recordService.delete(recordId);
      if (!deletedRecord) {
        return res.status(404).json({
          ok: false,
          message: 'Record not found',
        });
      }

      res.json({
        ok: true,
        message: 'Record deleted successfully',
      });
    } catch (error) {
      logger.error(`Error deleting record: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        recordId: req.params.recordId,
      });
      res.status(error.status || 500).json({
        ok: false,
        message: error.message || 'Failed to delete record',
      });
    }
  },
};

export default recordController;

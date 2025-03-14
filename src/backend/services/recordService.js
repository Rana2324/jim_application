import Record from '../models/recordModel.js';
import CustomError from '../utils/customError.js';
import logger from '../config/logger.js';

const recordService = {
  getAll: async () => {
    try {
      const records = await Record.find().populate('memberId').populate('workoutId');
      // Return empty array instead of throwing an error when no records are found
      return records || [];
    } catch (error) {
      logger.error(`Error in getAll: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
      });
      throw new CustomError('Failed to retrieve records', error.status || 500);
    }
  },

  getOne: async recordId => {
    try {
      const record = await Record.findById(recordId).populate('memberId').populate('workoutId');
      if (!record) {
        throw new CustomError('Record not found', 404);
      }
      return record;
    } catch (error) {
      logger.error(`Error in getOne: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        recordId,
      });
      throw new CustomError(`Failed to retrieve record with id ${recordId}`, error.status || 500);
    }
  },

  getMemberRecords: async memberId => {
    try {
      const records = await Record.find({ memberId }).populate('workoutId').sort({ date: -1 });
      // Return empty array instead of throwing an error when no records are found
      return records || [];
    } catch (error) {
      logger.error(`Error in getMemberRecords: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
        memberId,
      });
      throw new CustomError(
        `Failed to retrieve records for member ${memberId}`,
        error.status || 500
      );
    }
  },

  create: async recordData => {
    try {
      // Validate required fields before creating
      const requiredFields = ['memberId', 'workoutId', 'recordType', 'value', 'date'];
      const missingFields = requiredFields.filter(field => !recordData[field]);
      
      if (missingFields.length > 0) {
        throw new CustomError(`Missing required fields: ${missingFields.join(', ')}`, 400);
      }
      
      // Validate numeric fields
      if (isNaN(recordData.value)) {
        throw new CustomError('Value must be a number', 400);
      }
      
      // Validate date
      const dateObj = new Date(recordData.date);
      if (isNaN(dateObj.getTime())) {
        throw new CustomError('Invalid date format', 400);
      }
      
      // Create the record with validated data
      const record = new Record(recordData);
      return await record.save();
    } catch (error) {
      // If it's already a CustomError, just pass it through
      if (error instanceof CustomError) {
        throw error;
      }
      
      // Log the detailed error for debugging
      logger.error(`Error creating record: ${error.message}`, {
        stack: error.stack,
        data: recordData
      });
      
      throw new CustomError('Failed to create record', error.status || 500);
    }
  },

  update: async (recordId, recordData) => {
    try {
      // Validate numeric fields if provided
      if (recordData.value !== undefined && isNaN(recordData.value)) {
        throw new CustomError('Value must be a number', 400);
      }
      
      // Validate date if provided
      if (recordData.date) {
        const dateObj = new Date(recordData.date);
        if (isNaN(dateObj.getTime())) {
          throw new CustomError('Invalid date format', 400);
        }
      }
      
      const record = await Record.findByIdAndUpdate(recordId, recordData, { new: true })
        .populate('memberId')
        .populate('workoutId');
      if (!record) {
        throw new CustomError('Record not found', 404);
      }
      return record;
    } catch (error) {
      // If it's already a CustomError, just pass it through
      if (error instanceof CustomError) {
        throw error;
      }
      
      logger.error(`Error updating record: ${error.message}`, {
        stack: error.stack,
        recordId,
        data: recordData
      });
      
      throw new CustomError(`Failed to update record with id ${recordId}`, error.status || 500);
    }
  },

  delete: async recordId => {
    try {
      const record = await Record.findByIdAndDelete(recordId);
      if (!record) {
        throw new CustomError('Record not found', 404);
      }
      return { message: 'Record deleted successfully' };
    } catch (error) {
      logger.error(`Error deleting record: ${error.message}`, {
        stack: error.stack,
        recordId
      });
      throw new CustomError(`Failed to delete record with id ${recordId}`, error.status || 500);
    }
  },
};

export default recordService;

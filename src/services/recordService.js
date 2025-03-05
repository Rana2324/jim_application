import Record from "../models/recordModel.js";
import CustomError from "../utils/customError.js";

const recordService = {
    getAll: async () => {
        try {
            const records = await Record.find()
                .populate('memberId')
                .populate('workoutId');
            if (!records || records.length === 0) {
                throw new CustomError('No records found', 404);
            }
            return records;
        } catch (error) {
            throw new CustomError('Failed to retrieve records', error.status || 500);
        }
    },

    getOne: async (recordId) => {
        try {
            const record = await Record.findById(recordId)
                .populate('memberId')
                .populate('workoutId');
            if (!record) {
                throw new CustomError('Record not found', 404);
            }
            return record;
        } catch (error) {
            throw new CustomError(`Failed to retrieve record with id ${id}`, error.status || 500);
        }
    },

    getMemberRecords: async (recordId) => {
        try {
            const records = await Record.find({ recordId })
                .populate('workoutId')
                .sort({ date: -1 });
            if (!records || records.length === 0) {
                throw new CustomError('No records found for this member', 404);
            }
            return records;
        } catch (error) {
            throw new CustomError(`Failed to retrieve records for member ${memberId}`, error.status || 500);
        }
    },

    create: async (recordData) => {
        try {
            const record = new Record(recordData);
            return await record.save();
        } catch (error) {
            throw new CustomError('Failed to create record', error.status || 500);
        }
    },

    update: async (recordId, recordData) => {
        try {
            const record = await Record.findByIdAndUpdate(recordId, recordData, { new: true })
                .populate('memberId')
                .populate('workoutId');
            if (!record) {
                throw new CustomError('Record not found', 404);
            }
            return record;
        } catch (error) {
            throw new CustomError(`Failed to update record with id ${id}`, error.status || 500);
        }
    },

    delete: async (recordId) => {
        try {
            const record = await Record.findByIdAndDelete(recordId);
            if (!record) {
                throw new CustomError('Record not found', 404);
            }
            return { message: 'Record deleted successfully' };
        } catch (error) {
            throw new CustomError(`Failed to delete record with id ${id}`, error.status || 500);
        }
    }
};

export default recordService;

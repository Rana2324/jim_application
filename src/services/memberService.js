import Member from "../models/memberModel.js";
import CustomError from "../utils/customError.js";
import logger from "../config/logger.js";


const memberService = {
    getAll: async () => {
        try {
            const members = await Member.find();
            if (!members || members.length === 0) {
                throw new CustomError('No members found', 404);
            }
            return members;
        } catch (error) {
            logger.error(`Error in getAll: ${error.message}`, {
                stack: error.stack,
                status: error.status || 500,
            });
            throw new CustomError('Failed to retrieve members', error.status || 500);
        }
    },

    getOne: async (id) => {
        try {
            const member = await Member.findById(id);
            if (!member) {
                throw new CustomError('Member not found', 404);
            }
            return member;
        } catch (error) {
            throw new CustomError(`Failed to retrieve member with id ${id}`, error.status || 500);
        }
    },

    create: async (memberData) => {
        try {
          const member = new Member(memberData);
          return await member.save();
        } catch (error) {
          throw new CustomError('Failed to create member', error.status || 500);
        }
      },

    update: async (id, memberData) => {
        try {
            const member = await Member.findByIdAndUpdate(id, memberData, { new: true });
            if (!member) {
                throw new CustomError('Member not found', 404);
            }
            return member;
        } catch (error) {
            throw new CustomError(`Failed to update member with id ${id}`, error.status || 500);
        }
    },

    delete: async (id) => {
        try {
            const member = await Member.findByIdAndDelete(id);
            if (!member) {
                throw new CustomError('Member not found', 404);
            }
            return { message: 'Member deleted successfully' };
        } catch (error) {
            throw new CustomError(`Failed to delete member with id ${id}`, error.status || 500);
        }
    }
};


//export member services

export default memberService
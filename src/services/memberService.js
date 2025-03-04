import * as memberDb from '../database/memberDb.js';
import CustomError from "../utils/customError.js";

//member Service

const memberService = {
  getAll: async () => {
    try {
      return await memberDb.findAll();
    } catch (error) {
      throw new CustomError('Failed to retrieve members', error.status || 500);
    }
  },

  getOne: async (id) => {
    try {
      const member = await memberDb.findById(id);
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
      return await memberDb.create(memberData);
    } catch (error) {
      throw new CustomError('Failed to create member', error.status || 500);
    }
  },

  update: async (id, memberData) => {
    try {
      const member = await memberDb.update(id, memberData);
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
      const member = await memberDb.remove(id);
      if (!member) {
        throw new CustomError('Member not found', 404);
      }
      return { message: 'Member deleted successfully' };
    } catch (error) {
      throw new CustomError(`Failed to delete member with id ${id}`, error.status || 500);
    }
  }
};

export default memberService;

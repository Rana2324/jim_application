import Member from '../models/memberModel.js';
import CustomError from '../utils/customError.js';
import logger from '../config/logger.js';

const memberService = {
  getAll: async () => {
    try {
      const members = await Member.find();
      // Return empty array instead of throwing an error when no members are found
      return members || [];
    } catch (error) {
      logger.error(`Error in getAll: ${error.message}`, {
        stack: error.stack,
        status: error.status || 500,
      });
      throw new CustomError('Failed to retrieve members', error.status || 500);
    }
  },

  getOne: async id => {
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

  create: async memberData => {
    try {
      // Validate required fields before creating
      const requiredFields = ['name', 'gender', 'email', 'password', 'membershipType', 'phone'];
      const missingFields = requiredFields.filter(field => !memberData[field]);
      
      if (missingFields.length > 0) {
        throw new CustomError(`Missing required fields: ${missingFields.join(', ')}`, 400);
      }
      
      // Validate email format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(memberData.email)) {
        throw new CustomError('Invalid email format', 400);
      }
      
      // Validate phone format - more flexible regex to accept common formats
      // Allow formats like: +1234567890, 123-456-7890, (123) 456-7890, 123.456.7890, 123 456 7890
      const phoneRegex = /^(?:\+?\d{1,3}[-.\s]?)?\(?(?:\d{2,3})\)?[-.\s]?(?:\d{3,4})[-.\s]?(?:\d{4})$/;
      if (!phoneRegex.test(memberData.phone)) {
        throw new CustomError('Invalid phone number format. Please use a standard format like: +1234567890, 123-456-7890, (123) 456-7890', 400);
      }
      
      // Validate gender
      if (!['male', 'female'].includes(memberData.gender.toLowerCase())) {
        throw new CustomError('Gender must be either "male" or "female"', 400);
      }
      
      // Validate password length
      if (memberData.password.length < 4) {
        throw new CustomError('Password must be at least 4 characters long', 400);
      }
      
      // Create the member with validated data
      const member = new Member({
        ...memberData,
        gender: memberData.gender.toLowerCase() // Ensure gender is lowercase
      });
      
      return await member.save();
    } catch (error) {
      // Check if it's a duplicate key error (email already exists)
      if (error.code === 11000) {
        throw new CustomError('Email already in use', 400);
      }
      
      // If it's already a CustomError, just pass it through
      if (error instanceof CustomError) {
        throw error;
      }
      
      // Log the detailed error for debugging
      logger.error(`Error creating member: ${error.message}`, {
        stack: error.stack,
        data: memberData
      });
      
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

  delete: async id => {
    try {
      const member = await Member.findByIdAndDelete(id);
      if (!member) {
        throw new CustomError('Member not found', 404);
      }
      return { message: 'Member deleted successfully' };
    } catch (error) {
      throw new CustomError(`Failed to delete member with id ${id}`, error.status || 500);
    }
  },
};

//export member services
export default memberService;

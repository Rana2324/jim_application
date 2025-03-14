import dotenv from 'dotenv';
import mongoose from "mongoose";
import logger from './logger.js';


dotenv.config();

const connectDB = async () => {
    try {
      const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jim_application';
      await mongoose.connect(mongoURI);
      logger.info('MongoDB connected successfully');
    } catch (error) {
      logger.error('MongoDB connection failed', { message: error.message, stack: error.stack });
     
    }
  };

export default connectDB;

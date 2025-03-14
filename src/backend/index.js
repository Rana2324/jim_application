import router from './routes/index.js';
import connectDB from './config/connectDb.js';
import logger from './config/logger.js';
import morganMiddleware from './config/morgan.js';
import { errorHandler } from './middleware/errorHandler.js';

// Export all backend components
export {
  router,
  connectDB,
  logger,
  morganMiddleware,
  errorHandler
};

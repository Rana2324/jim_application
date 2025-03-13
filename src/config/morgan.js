import morgan from 'morgan';
import logger from './logger.js';

// Morgan HTTP logging middleware with Winston
const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()), // Logging request data to combined log
  },
});

export default morganMiddleware;

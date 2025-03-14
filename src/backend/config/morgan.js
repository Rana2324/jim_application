import morgan from 'morgan';
import logger from './logger.js';

// Morgan HTTP logging middleware with Winston
const morganMiddleware = morgan('dev', {
  stream: {
    write: message => logger.info(message.trim()),
  },
});

export default morganMiddleware;

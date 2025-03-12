import morgan from 'morgan';
import logger from './logger.js';

// Define custom token for response time in milliseconds
morgan.token('response-time-ms', (req, res) => {
  if (!res._header || !req._startAt) return '';
  const diff = process.hrtime(req._startAt);
  const time = diff[0] * 1e3 + diff[1] * 1e-6;
  return time.toFixed(3);
});

// Define custom token for user (if authenticated)
morgan.token('user', (req) => {
  return req.user ? req.user.email : 'anonymous';
});

// Define custom format
const morganFormat = process.env.NODE_ENV === 'production'
  ? ':remote-addr - :user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time-ms ms'
  : 'dev';

// Create morgan middleware
const morganMiddleware = morgan(morganFormat, {
  stream: logger.stream,
  skip: (req, res) => {
    // Skip logging for successful health check endpoints in production
    if (process.env.NODE_ENV === 'production') {
      return req.url === '/health' && res.statusCode === 200;
    }
    return false;
  },
});

export default morganMiddleware;

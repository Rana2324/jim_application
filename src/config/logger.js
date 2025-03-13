import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log directory path
const logDirectory = path.join(path.dirname(__dirname), 'logs');

// Custom format for console logs with colors
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ level, message }) => {
    // For error messages that are already formatted in our custom format
    if (level.includes('error') && message.includes('Timestamp:')) {
      const lines = message.split('\n');
      return [
        `\x1b[31m${lines[0]}\x1b[0m`, // Timestamp in red
        `\x1b[1;31m${lines[1]}\x1b[0m`, // Error Message in bold red
        `\x1b[36m${lines[2]}\x1b[0m`, // File in cyan
        `\x1b[35m${lines[3]}\x1b[0m`, // Method in magenta
        `\x1b[33m${lines[4]}\x1b[0m`, // Line in yellow
        `\x1b[37m${lines[5]}\x1b[0m`, // Stack Trace header in white
        ...lines.slice(6).map(line => `\x1b[90m${line}\x1b[0m`) // Stack trace in gray
      ].join('\n');
    }
    return `${level}: ${message}`;
  })
);

// Custom format for detailed error logging in files
const detailedErrorFormat = winston.format.printf(({ message }) => {
  return message; // Return the message exactly as is, without any additional formatting
});

// logger configuration
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: consoleFormat
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
      format: detailedErrorFormat // Use only the detailed error format without timestamp
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'combined.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  // Add exception handling
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDirectory, 'exceptions.log'),
      format: detailedErrorFormat
    })
  ],
  // Add promise rejection handling
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDirectory, 'rejections.log'),
      format: detailedErrorFormat
    })
  ],
  exitOnError: false
});

export default logger;

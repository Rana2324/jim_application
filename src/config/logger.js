import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the current file name and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path for the log directory and ensure it exists
const logDirectory = path.join(__dirname, 'logs');
createLogDirectory(logDirectory);

// Function to create log directory if it doesn't exist
function createLogDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
}

// Function to generate the timestamp format
const generateTimestampFormat = () => winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });

// General log format with timestamp and colorize
const logFormat = winston.format.combine(
  winston.format.colorize({ all: true, colors: { info: 'green', warn: 'yellow', error: 'red' } }),
  winston.format.printf(({ level, message }) => {
    return `${level}: ${message}  ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`;
  })
);

// Detailed log format with timestamp for errors and rejections
const detailedErrorFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} - ${level.toUpperCase()}: ${message}`;
});

// Create common transport settings for file logs
const createFileTransport = (filename, level = 'info', format = detailedErrorFormat) => {
  return new winston.transports.File({
    filename: path.join(logDirectory, filename),
    level: level,
    format: winston.format.combine(generateTimestampFormat(), format),
  });
};

// Logger setup
const logger = winston.createLogger({
  level: 'info', // Default log level is 'info'

  transports: [
    // Log to console with colorized output
    new winston.transports.Console({
      format: logFormat,
    }),

    // Error log file (only error-level messages)
    createFileTransport('error.log', 'error'),

    // Combined log file (logs all levels: info, warn, error)
    new winston.transports.File({
      filename: path.join(logDirectory, 'combined.log'),
      format: winston.format.combine(
        generateTimestampFormat(),
        winston.format.json() // JSON format for easy parsing
      ),
    }),
  ],

  // Handling unhandled exceptions
  exceptionHandlers: [createFileTransport('exceptions.log', 'error')],

  // Handling promise rejections
  rejectionHandlers: [createFileTransport('rejections.log', 'error')],

  // Prevents process from exiting on handled errors
  exitOnError: false,
});

export default logger;

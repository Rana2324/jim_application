import winston from 'winston';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Winston Configuration
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.errors({ stack: true })
    ),
    transports: [
        // Console logging for development
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        // File logging for errors
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // File logging for all levels
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', 'combined.log'),
            maxsize: 5242880,
            maxFiles: 5
        })
    ]
});

// Morgan Configuration
const morganFormat = process.env.NODE_ENV === 'production'
    ? ':remote-addr - :user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms'
    : 'dev';

// Create stream for Morgan to write to Winston
const morganStream = {
    write: (message) => logger.info(message.trim())
};

// Create Morgan middleware
const httpLogger = morgan(morganFormat, { stream: morganStream });

export { logger, httpLogger };

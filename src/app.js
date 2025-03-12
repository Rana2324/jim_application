// Import required modules
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import router from './routes/index.js';
import pageRoutes from './routes/pageRoutes.js';
import logger from './config/logger.js';
import morganMiddleware from './config/morgan.js';

const app = express();

// Use Morgan middleware for HTTP request logging
app.use(morganMiddleware);

// Middleware to handle JSON and URL encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up static files
app.use(express.static(path.join(process.cwd(), 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Define page routes first
app.use('/', pageRoutes);

// Define API routes under /api/v1
app.use('/api/v1', router);

// Add error handling for undefined routes
app.use((req, res) => {
    logger.warn(`404 - Route not found: ${req.originalUrl}`);
    res.status(404).render('404');
});

// Global error handler
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

// Export the app instance
export default app;

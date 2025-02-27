// Import required packages
import express from 'express';
import morgan from 'morgan';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

// Create server
const app = express();
const PORT = 4000;

// Setup middleware
app.use(morgan('dev'));
app.use(express.json());

// Setup routes
app.use('/api/v1', router);

// Use the error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

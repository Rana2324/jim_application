// Import required packages
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/connectDb.js';
import { errorHandler } from './middleware/errorHandler.js';
import router from './routes/index.js';

// Load env vars
dotenv.config();

// Connect to MongoD
connectDB();

// Create server
const app = express();
const PORT = process.env.PORT || 5000;

// Setup middleware
app.use(morgan('dev'));
app.use(express.json());
app.set("view engine", "ejs");
app.set('views', './views');
app.use(express.static('public'));

// Setup routes
app.use('/api/v1', router); 

// Use the error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

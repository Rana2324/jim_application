import logger from './config/logger.js'; // Logger configuration
import dotenv from 'dotenv';
import app from './app.js'; // Express app configuration
import connectDB from './config/connectDb.js';

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 5000;

// Function to start the server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start the server and listen on the given port
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT} http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Error starting the server: ${error.message}`);
  }
};

// Start the server
startServer();

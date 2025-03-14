import dotenv from 'dotenv';
import app from './app.js'; // Express app configuration
import { logger, connectDB } from './backend/index.js';
import { exec } from 'child_process';
import util from 'util';

// Convert exec to Promise-based
const execPromise = util.promisify(exec);

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 5000;

// Function to kill process using a specific port (Windows-specific)
const killProcessOnPort = async (port) => {
  try {
    // Find the process ID using the port
    const { stdout } = await execPromise(`netstat -ano | findstr :${port}`);
    
    if (stdout) {
      // Extract the PID from the output
      const lines = stdout.split('\n');
      for (const line of lines) {
        if (line.includes('LISTENING')) {
          const pidMatch = line.match(/\s+(\d+)$/);
          if (pidMatch && pidMatch[1]) {
            const pid = pidMatch[1];
            logger.info(`Found process with PID ${pid} using port ${port}, terminating...`);
            
            // Kill the process
            await execPromise(`taskkill /F /PID ${pid}`);
            logger.info(`Successfully terminated process with PID ${pid}`);
            return true;
          }
        }
      }
    }
    
    return false;
  } catch (error) {
    logger.error(`Error killing process on port ${port}: ${error.message}`);
    return false;
  }
};

// Function to start the server
const startServer = async () => {
  try {
    logger.info('Starting server...');

    // Connect to MongoDB first
    await connectDB();
    logger.info('MongoDB connected, now starting Express server...');

    try {
      // Try to start the server
      const server = app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT} http://localhost:${PORT}`);
      });

      // Add error handling for the server
      server.on('error', async (error) => {
        // If port is already in use, try to kill the process and restart
        if (error.code === 'EADDRINUSE') {
          logger.warn(`Port ${PORT} is already in use, attempting to free it...`);
          
          // Try to kill the process using the port
          const killed = await killProcessOnPort(PORT);
          
          if (killed) {
            // Try starting the server again after a short delay
            setTimeout(() => {
              logger.info(`Retrying to start server on port ${PORT}...`);
              server.listen(PORT, () => {
                logger.info(`Server started on port ${PORT} http://localhost:${PORT}`);
              });
            }, 1000);
          } else {
            logger.error(`Could not free port ${PORT}. Please manually close the application using this port.`);
          }
        } else {
          logger.error(`Express server error: ${error.message}`);
        }
      });
    } catch (error) {
      // If we catch an error here, try to kill the process and restart
      if (error.code === 'EADDRINUSE') {
        logger.warn(`Port ${PORT} is already in use, attempting to free it...`);
        const killed = await killProcessOnPort(PORT);
        
        if (killed) {
          // Restart the server
          startServer();
        } else {
          logger.error(`Could not free port ${PORT}. Please manually close the application using this port.`);
        }
      } else {
        throw error;
      }
    }
  } catch (error) {
    logger.error(`Error starting the server: ${error.message}`);
  }
};

// Start the server
logger.info('Calling startServer function...');
startServer();

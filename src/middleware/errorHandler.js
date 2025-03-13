import logger from '../config/logger.js';

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  // Extract error details
  const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const errorMessage = err.message || "Internal Server Error";
  const status = err.status || 500;
  
  // Extract file, method and line number from stack trace
  let filePath = "Unknown";
  let methodName = "Unknown";
  let lineNumber = "Unknown";
  
  if (err.stack) {
    const stackLines = err.stack.split('\n');
    if (stackLines.length > 1) {
      // First line contains the error message
      // Second line typically contains file and line information
      const fileLineMatch = stackLines[1].match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/);
      if (fileLineMatch) {
        methodName = fileLineMatch[1];
        filePath = fileLineMatch[2];
        lineNumber = fileLineMatch[3];
      } else {
        // Alternative format: at /path/to/file.js:line:column
        const altMatch = stackLines[1].match(/at\s+(.*):(\d+):(\d+)/);
        if (altMatch) {
          filePath = altMatch[1];
          lineNumber = altMatch[2];
        }
      }
    }
  }

  // Format the error log exactly as requested
  const formattedErrorLog = 
  `Timestamp: ${timestamp}
   Error Message: ${errorMessage}
   File: ${filePath}
   Method: ${methodName}
   Line: ${lineNumber}
   Stack Trace:
   ${err.stack || 'No stack trace available'}`;

  // Log detailed error with Winston
  logger.error(formattedErrorLog);

  // Send error response
  res.status(status).json({
    status: "error",
    message: errorMessage,
  });
};

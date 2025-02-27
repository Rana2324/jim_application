// utils/CustomError.js
class CustomError extends Error {
    constructor(message, status = 500, code = null) {
        super(message);
        this.status = status;  // Custom status code
        this.code = code;      // Optional error code
        this.name = this.constructor.name;  // Name of the error class
        Error.captureStackTrace(this, this.constructor);  // Capture the stack trace
    }
}

export default CustomError;

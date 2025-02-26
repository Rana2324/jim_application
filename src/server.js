import express from 'express';
import morgan from 'morgan';
import router from './routes/index.js';

// Constants
const app = express();
const PORT = 4000;

// Simple Morgan setup to log requests
app.use(morgan('dev'));

// Middleware for JSON and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use("/api/v1", router);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});

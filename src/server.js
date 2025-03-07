import dotenv from 'dotenv';
import connectDB from './config/connectDb.js';
import app from './app.js';

// Load env vars
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

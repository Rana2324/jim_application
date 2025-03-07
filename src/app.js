// Import required modules
import express from 'express';
import path from 'path';
import router from './routes/index.js';
import pageRoutes from './routes/pageRoutes.js';

const app = express();

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
    res.status(404).render('404');
});

// Export the app instance
export default app;

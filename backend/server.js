import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();


// --- Middleware Section ---
// This section must come before any of your API routes.

// 1. CORS Middleware (Updated for Deployment)
// This allows your live frontend to make requests to this backend.
// The origin will be set in your Render environment variables.
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

// 2. Body Parser Middleware
// This allows your server to accept JSON data in the body of requests.
app.use(express.json());


// --- API Routes Section ---
// All your routes are defined after the middleware has been set up.

app.get('/', (req, res) => {
  res.send('ShopZilla API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);


// --- Server Listener ---
// This starts the server on the port defined in your environment variables,
// or on port 5000 if it's not defined.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

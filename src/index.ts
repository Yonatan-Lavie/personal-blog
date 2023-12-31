// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';


// Load environment variables from .env file
dotenv.config();

// Import routes
import postsRoutes from './routes/posts';
import commentsRoutes from './routes/comments';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import { corsMiddleware } from './middlewares/cors-conf-middleware';

// Create Express application
export const app = express();


//  Update with the current public domain
swaggerDocument.servers[0].url = process.env.PUBLIC_DOMAIN_NAME!
// Serve the Swagger UI at /api/docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
// app.use(corsMiddleware());
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve the React app's static files
const buildPath = path.join(__dirname, "..", "build"); // Path to the 'build' folder
app.use(express.static(buildPath));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// API Routes
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Catch-all route to handle other requests and serve the React app
app.get("/", (req, res) => {
  console.log("fdsfdfsdfdsfsdf");
  
  res.sendFile(path.join(buildPath, "index.html"));
});

// 404 Route
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

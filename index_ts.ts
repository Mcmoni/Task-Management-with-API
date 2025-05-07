import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { taskRouter } from './routes/task.routes';
import { swaggerRouter } from './routes/swagger.routes';
import { errorHandler } from './middleware/error.middleware';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', taskRouter);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the Task Manager API',
    version: '1.0.0',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import config from './config';
import { logger } from './utils/logger';
import routes from './routes';

// Create Express app
const app = express();
const port = config.port;

// Connect to MongoDB
mongoose.connect(config.mongodbUri)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    // Don't exit in production, just log the error
    if (config.environment !== 'production') {
      process.exit(1);
    }
  });

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Log requests in development
if (config.environment !== 'production') {
  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.url}`);
    next();
  });
}

// Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Mutable API Server',
    version: '1.0.0',
    status: 'running'
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: config.environment === 'production' ? undefined : err.message
  });
});

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port} in ${config.environment} mode`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;

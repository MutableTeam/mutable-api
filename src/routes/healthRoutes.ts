// src/routes/healthRoutes.ts
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Basic health check
router.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date(),
    service: 'mutable-api-server'
  });
});

// Database health check
router.get('/database', async (req, res) => {
  try {
    // Check MongoDB connection
    const dbStatus = mongoose.connection.readyState;
    /*
      0 = disconnected
      1 = connected
      2 = connecting
      3 = disconnecting
    */
    if (dbStatus === 1) {
      res.status(200).json({ 
        status: 'ok', 
        database: 'connected',
        timestamp: new Date()
      });
    } else {
      res.status(500).json({ 
        status: 'error', 
        database: 'disconnected',
        readyState: dbStatus,
        timestamp: new Date()
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date()
    });
  }
});

export default router;

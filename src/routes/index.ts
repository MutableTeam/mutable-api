// src/routes/index.ts
import express from 'express';
import authRoutes from './authRoutes';
import healthRoutes from './healthRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/health', healthRoutes);

export default router;

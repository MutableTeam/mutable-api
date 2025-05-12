// src/routes/authRoutes.ts
import express from 'express';
import { register, login, getCurrentPlayer } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Register a new player
router.post('/register', register);

// Login a player
router.post('/login', login);

// Get current player
router.get('/me', auth, getCurrentPlayer);

export default router;

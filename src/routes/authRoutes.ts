import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// Register a new player
router.post('/register', register);

// Login a player
router.post('/login', login);

export default router;

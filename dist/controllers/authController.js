"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const Player_1 = __importDefault(require("../models/Player"));
const logger_1 = require("../utils/logger");
// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';
// Register a new player
const register = async (req, res) => {
    try {
        const { name, email, password, walletAddress } = req.body;
        // Validate inputs
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        // Check if player with email or wallet already exists
        const existingPlayer = await Player_1.default.findOne({
            $or: [
                { email: email },
                { walletAddress: walletAddress }
            ]
        });
        if (existingPlayer) {
            return res.status(400).json({ message: 'Player already exists' });
        }
        // Create new player
        const player = new Player_1.default({
            id: (0, uuid_1.v4)(),
            name,
            email,
            password,
            walletAddress
        });
        await player.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: player.id, name: player.name }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(201).json({
            message: 'Player registered successfully',
            token,
            player: {
                id: player.id,
                name: player.name,
                email: player.email,
                walletAddress: player.walletAddress,
                stats: player.stats
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};
exports.register = register;
// Login a player
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Find player by email
        const player = await Player_1.default.findOne({ email });
        if (!player) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await player.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: player.id, name: player.name }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({
            message: 'Login successful',
            token,
            player: {
                id: player.id,
                name: player.name,
                email: player.email,
                walletAddress: player.walletAddress,
                stats: player.stats
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};
exports.login = login;

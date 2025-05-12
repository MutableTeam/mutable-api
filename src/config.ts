// src/config.ts
import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mutable-platform',
  jwtSecret: process.env.JWT_SECRET || 'default-jwt-secret-change-in-production',
  environment: process.env.NODE_ENV || 'development',
  jwtExpiresIn: '7d'
};

export default config;

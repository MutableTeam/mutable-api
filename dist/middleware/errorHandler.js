"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error('API Error:', err);
    // Check if headers have already been sent
    if (res.headersSent) {
        return next(err);
    }
    // Default error response
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
};
exports.errorHandler = errorHandler;

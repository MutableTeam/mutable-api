"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeObject = exports.isValidPassword = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPassword = (password) => {
    return password.length >= 8;
};
exports.isValidPassword = isValidPassword;
const sanitizeObject = (obj, allowedFields) => {
    const sanitized = {};
    for (const field of allowedFields) {
        if (obj[field] !== undefined) {
            sanitized[field] = obj[field];
        }
    }
    return sanitized;
};
exports.sanitizeObject = sanitizeObject;

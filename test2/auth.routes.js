// routes/auth.routes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

// Validation rules
const validateUser = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register a new user
router.post('/register', validateUser, handleValidationErrors, authController.registerUser);

// Login user
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], handleValidationErrors, authController.loginUser);

// Logout user
router.post('/logout', auth, authController.logoutUser);

// Logout user from all sessions
router.post('/logoutAll', auth, authController.logoutUserFromAllSessions);

module.exports = router;
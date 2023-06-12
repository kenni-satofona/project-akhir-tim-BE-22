const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware, authRole } = require('../middleware/auth');

// Create user (admin role required)
router.post(
  '/',
  [
    authMiddleware,
    authRole('admin'),
    [
      check('name', 'Name is required').notEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
      check('role', 'Role is required').notEmpty()
    ]
  ],
  UserController.createUser
);

// Get all users (admin role required)
router.get('/', [authMiddleware, authRole('admin')], UserController.getAllUsers);

// Get user by ID
router.get('/:id', authMiddleware, UserController.getUserById);

// Update user by ID
router.put('/:id', authMiddleware, UserController.updateUserById);

// Delete user by ID (admin role required)
router.delete('/:id', [authMiddleware, authRole('admin')], UserController.deleteUserById);

module.exports = router;

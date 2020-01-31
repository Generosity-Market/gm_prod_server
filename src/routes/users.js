const express = require('express');
// const { authenticateRoute } = require('../auth/middleware');

const router = express.Router();

const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    getUserCauses,
    getSupportedCauses,
    editUser,
    setUserImage,
    deleteUser,
} = require('../controllers/users');

// Signup a user
router.post('/', registerUser);

// Login route returns User data w/Preferences
router.post('/login', loginUser);

// Get all users w/Preferences
router.get('/', getAllUsers);

// Get a user by id w/Preferences & Causes
// TODO: Use authenticateRoute to verify the user before making any changes
router.get('/:id', getUserById);

// Get all causes created by the user
// TODO: Use authenticateRoute to verify the user before making any changes
router.get('/:id/causes', getUserCauses);

// Get all donations made by the user
// TODO: Use authenticateRoute to verify the user before making any changes
router.get('/:id/donations', getSupportedCauses);

// Edit users details
// TODO: Use authenticateRoute to verify the user before making any changes
router.put('/:id/edit', editUser);

// Post user images
// TODO: Use authenticateRoute to verify the user before making any changes
router.post('/:id/images', setUserImage);

// Delete a user from the db
// TODO: Use authenticateRoute to verify the user before making any changes
router.delete('/:id', deleteUser);

module.exports = router;

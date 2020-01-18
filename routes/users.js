const express = require('express');
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
router.get('/:id', getUserById);

// Get all causes created by the user
router.get('/:id/causes', getUserCauses);

// Get all donations made by the user
router.get('/:id/donations', getSupportedCauses);

// Edit users details
router.post("/:id/edit", editUser);

router.post('/:id/images', setUserImage);

// Delete a user from the db
router.delete('/:id', deleteUser);

module.exports = router;
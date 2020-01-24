const express = require('express');

const router = express.Router();

const {
    createCause,
    getCauses,
    getCauseById,
    editCauseById,
} = require('../controllers/causes');

// Create a cause
router.post('/', createCause);

// Getting the entire cause list with Preferences, Donations and Comments
router.get('/', getCauses);

// Get a cause by the id w/Preferences, Donations, and Comments
router.get('/:id', getCauseById);

// Edit cause details by the cuase id
router.put('/:id/edit', editCauseById);

module.exports = router;

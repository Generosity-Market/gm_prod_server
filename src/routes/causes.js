const express = require('express');
const { authenticateRoute } = require('../auth/middleware');

const router = express.Router();

const {
    createCause,
    getCauses,
    getCauseById,
    editCauseById,
} = require('../controllers/causes');

// Create a cause
// TODO: Should log in first before creating a cause?
router.post('/', createCause);

// Getting the entire cause list with Preferences, Donations and Comments
router.get('/', getCauses);

// Get a cause by the id w/Preferences, Donations, and Comments
router.get('/:id', getCauseById);

// Edit cause details by the cause id
// TODO: use authenticateRoute to verify the user before editing the cause
router.put('/:id/edit', authenticateRoute(), editCauseById);

module.exports = router;

const express = require('express');

const router = express.Router();

const { createDonation } = require('../controllers/donations');

// TODO: WIP This route will also add comments (if applicable)
router.post('/new', createDonation);

module.exports = router;

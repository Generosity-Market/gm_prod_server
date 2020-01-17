const express = require('express');
const router = express.Router();

/**
 * Documentation Routes
 */

// TODO: Use this route for Api documentation
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Everything is fine, we\'re fine',
        request: req.body,
    });
});

module.exports = router;

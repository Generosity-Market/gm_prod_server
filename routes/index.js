require('dotenv').config();
const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
// const Utils = require('../utilities/utilities');

const router = express.Router();

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

// Passport Basic Authentication Strategy
passport.use(new BasicStrategy(
    function (username, password, done) {
        const userPassword = users[username];
        if (!userPassword) { return done(null, false); }
        if (userPassword !== password) { return done(null, false); }
        return done(null, username);
    }
));

// Allows CORS
router.use(corsMiddleware);

/**
 * Documentation Routes
 */

// Use this route for Api documentation
router.get('/', (req, res) => {
    res.status(200).send({ status: '200', message: 'Everything is fine, we\'re fine', requestBody: req.body });
});


module.exports = router;
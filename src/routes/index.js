require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');

const documentation = require('./documentation');
const users = require('./users');
const causes = require('./causes');
// const donations = require('./donations');
// const comments = require('./comments');
// const organizations = require('./organizations');
// const preferences = require('./preferences');

const {
    corsPolicy,
} = require('../middleware');

const router = express.Router();

// Passport Basic Authentication Strategy
passport.use(new BasicStrategy(
    (username, password, done) => {
        const userPassword = users[username];

        if (!userPassword) return done(null, false);
        if (userPassword !== password) return done(null, false);

        return done(null, username);
    },
));

// Allows CORS
router.use(corsPolicy);

router.use('/', documentation);
router.use('/docs', documentation);
router.use('/users', users);
router.use('/causes', causes);
// router.use('/donations', donations);
// router.use('/comments', comments);
// router.use('/organizations', organizations);
// router.use('/preferences', preferences);


module.exports = router;

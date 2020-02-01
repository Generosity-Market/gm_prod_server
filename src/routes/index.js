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
router.use('/api', documentation);
router.use('/api/docs', documentation);
router.use('/api/users', users);
router.use('/api/causes', causes);
// router.use('/api/donations', donations);
// router.use('/api/comments', comments);
// router.use('/api/organizations', organizations);
// router.use('/api/preferences', preferences);


module.exports = router;

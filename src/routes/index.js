require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');

// Route collections
const documentation = require('./documentation');
const users = require('./users');
const causes = require('./causes');
const donations = require('./donations');
// const comments = require('./comments');
// const organizations = require('./organizations');
// const preferences = require('./preferences');

const router = express.Router();

router.use('/api/docs', swaggerUi.serve, documentation);
router.use('/api/users', users);
router.use('/api/causes', causes);
router.use('/api/donations', donations);
// router.use('/api/comments', comments);
// router.use('/api/organizations', organizations);
// router.use('/api/preferences', preferences);
router.use('/', swaggerUi.serve, documentation);
router.use('/docs', swaggerUi.serve, documentation);
router.use('/api', (req, res) => res.status(200).send('See /api/docs for more info'));
router.use('*', (req, res) => res.status(404).send('Not found'));

module.exports = router;

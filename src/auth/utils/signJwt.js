const jwt = require('jsonwebtoken');

const options = {
    expiresIn: '90 days',
};

const signJwt = (payload) => jwt.sign(payload, process.env.JWT_SECRET, options);

module.exports = signJwt;

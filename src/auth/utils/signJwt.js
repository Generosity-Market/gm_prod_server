const jwt = require('jsonwebtoken');
const { secret, jwt_options } = require('../config');

const signJwt = (payload) => jwt.sign(payload, secret, jwt_options);

module.exports = signJwt;

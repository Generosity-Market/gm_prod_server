const corsPolicy = require('./corsPolicy');
const authenticateUser = require('./authenticateUser');

module.exports = {
    authenticateUser,
    corsPolicy,
};

const { createNewObject, getExclusions } = require('./transforms');
const { hashPassword } = require('./authentication');
const awsUtils = require('./awsUtils');
const stripe = require('./stripe');
const logger = require('./logger');
const error = require('./error');

module.exports = {
    awsUtils,
    createNewObject,
    getExclusions,
    hashPassword,
    error,
    logger,
    stripe,
};

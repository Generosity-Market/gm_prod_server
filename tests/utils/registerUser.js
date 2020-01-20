const { user } = require('../../__mocks__');

const createItem = require('./createItem');

const {
    details,
    passwords,
    Preferences,
} = user;


const allOptions = { ...details, ...passwords, ...Preferences };

module.exports = async () => createItem('users', allOptions);

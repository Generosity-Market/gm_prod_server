const request = require('supertest');

const app = require('../../server');
const {
    user: {
        details,
        passwords,
    },
} = require('../../__mocks__');

const creds = { email: details.email, password: passwords.password };

module.exports = (credentials = creds) => request(app).post('/api/users/login').send(credentials);

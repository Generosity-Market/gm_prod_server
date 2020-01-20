const request = require('supertest');
const app = require('../../server');
const regiesterUser = require('./registerUser');

const {
    user: {
        details,
        passwords,
    },
} = require('../../__mocks__');

const creds = { email: details.email, password: passwords.password };

const login = async (credentials = creds, throwError) => {
    let response;
    response = await request(app).post('/api/users/login').send(credentials);

    if (response.error && !throwError) {
        response = await regiesterUser();
    }

    return response;
};

module.exports = login;

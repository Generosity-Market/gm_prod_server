const request = require('supertest');
const app = require('../../../server');
const registerUser = require('./registerUser');

const {
    user: {
        details,
        passwords,
    },
} = require('../../__mocks__');

const creds = { email: details.email, password: passwords.password };

/* eslint-disable-next-line default-param-last */
const login = async (credentials = creds, throwError) => {
    let response;
    response = await request(app).post('/api/users/login').send(credentials);

    if (response.error && !throwError) {
        await registerUser();
        response = await login();
    }

    return response;
};

module.exports = login;

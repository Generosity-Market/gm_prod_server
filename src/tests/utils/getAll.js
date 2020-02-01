const request = require('supertest');

const app = require('../../../server');

module.exports = (type, token) => request(app).get(`/api/${type}`).set('Authorization', `Bearer ${token}`).send();

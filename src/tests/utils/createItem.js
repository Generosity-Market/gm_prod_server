const request = require('supertest');

const app = require('../../../server');

module.exports = (type, data, token) => request(app).post(`/api/${type}`).set('Authorization', `Bearer ${token}`).send(data);

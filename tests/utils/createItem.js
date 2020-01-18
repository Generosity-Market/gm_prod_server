const request = require('supertest');

const app = require('../../server');

module.exports = (type, data) => request(app).post(`/api/${type}`).send(data);

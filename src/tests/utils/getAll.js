const request = require('supertest');

const app = require('../../../server');

module.exports = (type) => request(app).get(`/api/${type}`).send();

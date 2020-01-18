const request = require('supertest');

const app = require('../../server');

module.exports = (type, id) => request(app).get(`/api/${type}/${id}`).send();

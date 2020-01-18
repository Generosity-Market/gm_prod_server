const request = require('supertest');

const app = require('../../server');

module.exports = (type, id, data) => request(app).post(`/api/${type}/${id}/edit`).send(data);

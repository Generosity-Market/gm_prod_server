const request = require('supertest');

const app = require('../../../server');

module.exports = (type, id, data, token) => request(app).put(`/api/${type}/${id}/edit`).set('Authorization', `Bearer ${token}`).send(data);

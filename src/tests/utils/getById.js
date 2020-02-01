const request = require('supertest');

const app = require('../../../server');

module.exports = (type, id, token) => request(app).get(`/api/${type}/${id}`).set('Authorization', `Bearer ${token}`).send();

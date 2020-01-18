// const request = require('supertest');
// const app = require('../../server');
// const { cause, user } = require('../../__mocks__');

// const {
//     createItem,
//     editItem,
//     getAll,
//     getById,
//     login,
// } = require('../utils');

// const {
//     details,
//     editedDetails,
//     editedPreferences,
//     passwords,
//     Preferences,
// } = user;

describe('Cause Endpoints', () => {
    it('should pass a test', () => {
        expect(true).toEqual(true);
    });

    describe('[POST] - /api/causes', () => {
        it.todo('should return status code 201 (Created)');

        it.todo('should return a newly created cause');

        it.todo('should contain a cause\'s preferences');
    });

    describe('[GET] - /api/causes', () => {
        it.todo('should return status code 200 (ok)');

        it.todo('should return at least one cause');

        it.todo('should return a cause object');

        it.todo('should contain a cause\'s preferences');
    });

    describe('[GET] - /api/causes/:id', () => {
        it.todo('should return status code 200 (ok)');

        it.todo('should return exactly one cause');

        it.todo('should return a cause object');

        it.todo('should contain a cause\'s preferences');
    });

    describe('[PUT] - /api/causes/:id', () => {
        it.todo('should return status code 201 (created)');

        it.todo('should return a cause with updated data');

        it.todo('should contain a cause\'s preferences');
    });
});

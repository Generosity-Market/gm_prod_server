// const request = require('supertest');
// const app = require('../../server');
const { user } = require('../../__mocks__');

const {
    createItem,
    editItem,
    getAll,
    getById,
    login,
} = require('../utils');

const {
    details,
    editedDetails,
    editedPreferences,
    passwords,
    Preferences,
} = user;


const allOptions = { ...details, ...passwords, ...Preferences };

describe('User Endpoints', () => {
    let user_id;
    let response;
    beforeAll(async () => {
        response = await createItem('users', allOptions);
        user_id = response.body.id;
    });

    describe('[POST] - /api/users', () => {
        it('should return status code 201 (created)', () => {
            expect(response.statusCode).toEqual(201);
        });

        it('should return a new user', () => {
            expect(response.body).toEqual(expect.objectContaining(details));
        });

        it('should contain a user\'s preferences', () => {
            expect(response.body).toHaveProperty('Preferences');
        });
    });

    describe('[POST] - /api/users/login', () => {
        beforeAll(async () => {
            response = await login();
        });

        it('should return status code 200 (ok)', () => {
            expect(response.statusCode).toEqual(200);
        });

        it('should return a user object', () => {
            expect(response.body.user).toEqual(expect.objectContaining(details));
        });

        it('should return an auth token', () => {
            expect(response.body).toHaveProperty('auth_token');
        });

        it('should throw an error when email or password is empty', async () => {
            response = await login({ email: '', password: '' });
            expect(response.statusCode).toEqual(403);
            expect(response.body.error).toBe('Fields must not be empty.');
        });

        it('should throw an error when passwords don\'t match', async () => {
            response = await login({ email: 'test_user@testemail.com', password: 'incorrect_password' });
            expect(response.statusCode).toEqual(403);
            expect(response.body.error).toBe('Username or password does not match.');
        });

        it('should throw an error when the email isn\'t found', async () => {
            response = await login({ email: 'test_testy@testemail.com', password: 'TestPassword_0123' });
            expect(response.statusCode).toEqual(404);
            expect(response.body.error).toBe('Could not find email in our system.');
        });
    });

    describe('[GET] - /api/users', () => {
        beforeAll(async () => {
            response = await getAll('users');
        });

        it('should return status code 200 (ok)', () => {
            expect(response.statusCode).toEqual(200);
        });

        it('should return at least one user', () => {
            expect(response.body.length).toEqual(1);
        });

        it('should return a user object', () => {
            expect(response.body[0]).toEqual(expect.objectContaining(details));
        });

        it('should contain a user\'s preferences', () => {
            expect(response.body[0]).toHaveProperty('Preferences');
        });
    });

    describe('[GET] - /api/users/:id', () => {
        beforeAll(async () => {
            response = await getById('users', user_id);
        });

        it('should return status code 200 (ok)', async () => {
            expect(response.statusCode).toEqual(200);
        });

        it('should return exactly one user', async () => {
            expect(response.body.length).toBeUndefined();
        });

        it('should return a user object', async () => {
            expect(response.body).toEqual(expect.objectContaining(details));
        });

        it('should return a user\'s preferences', () => {
            expect(response.body).toHaveProperty('Preferences');
        });
    });

    describe('[POST] - /api/users/:id/edit', () => {
        beforeAll(async () => {
            response = await editItem('users', user_id, { ...editedDetails, ...editedPreferences });
        });

        it('should return status code 201 (created)', async () => {
            expect(response.statusCode).toEqual(201);
        });

        it('should return a user object with new data', async () => {
            const newDetails = { ...details, ...editedDetails };
            expect(response.body).toEqual(expect.objectContaining(newDetails));
        });

        it('should return a user\'s preferences', () => {
            const { body } = response;
            const prefs = editedPreferences.Preferences;
            expect(body).toHaveProperty('Preferences');
            expect(body.Preferences).toEqual(expect.objectContaining({ ...prefs }));
        });
    });

    describe('[GET] - /api/users/:id/causes', () => {
        it.todo('should return status code 200 (ok)');

        it.todo('should return a user\'s created causes');
    });

    describe('[GET] - /api/users/:id/donations', () => {
        it.todo('should return status code 200 (ok)');

        it.todo('should return causes that a user has donated too');
    });

    describe('[DELETE] - /api/users/:id', () => {
        it.todo('should return status code 200 (ok)');

        it.todo('should return message stating user was deleted');
    });
});

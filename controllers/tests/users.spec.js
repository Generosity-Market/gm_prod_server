const request = require('supertest');
const app = require('../../server');

const user = {
    email: 'test_user@testemail.com',
    first_name: 'Testy',
    last_name: 'Tester',
    address_1: '123 Testing Dr',
    address_2: 'Unit D',
    city: 'Atlanta',
    state: 'GA',
    zipcode: '30350',
    coverImage: 'jessica-lewis-512219.jpg',
    profileImage: 'profile2.jpg',
};

const passwords = {
    password: 'TestPassword_0123',
    confirmPassword: 'TestPassword_0123',
};

const preferences = {
    round_image: true,
    white_text: true,
};


const allOptions = { ...user, ...passwords, ...preferences };

describe('User Endpoints', () => {
    // let user_id;
    let response;
    beforeAll(async () => {
        response = await request(app).post('/api/users').send(allOptions);
        // user_id = response.body.id;
    });

    describe('[POST] - /api/users', () => {
        it('should receive status code 201 (created)', async () => {
            expect(response.statusCode).toEqual(201);
        });

        it('should return a new user', async () => {
            expect(response.body).toEqual(expect.objectContaining(user));
        });

        it('should contain a user\'s preferences', () => {
            expect(response.body).toHaveProperty('Preferences');
        });
    });

    describe('[POST] - /api/users/login', () => {
        it.todo('should return status code 200 (ok)');

        it.todo('should return a user object');

        it.todo('should return an auth token');

        it.todo('should throw an error when email or password is empty');

        it.todo('should throw an error when passwords don\'t match');

        it.todo('should throw an error when the email isn\'t found');
    });

    describe('[GET] - /api/users', () => {
        let getResponse;
        beforeAll(async () => {
            getResponse = await request(app).get('/api/users').send();
        });

        it('should receive status code 200 (ok)', async () => {
            expect(getResponse.statusCode).toEqual(200);
        });

        it('should return at least one user', async () => {
            expect(getResponse.body.length).toEqual(1);
        });

        it('should return a user object', async () => {
            expect(getResponse.body[0]).toEqual(expect.objectContaining(user));
        });

        it('should contain a user\'s preferences', () => {
            expect(getResponse.body[0]).toHaveProperty('Preferences');
        });
    });

    describe('[GET] - /api/users/:id', () => {
        it.todo('should return status code 200 (ok)');

        it.todo('should return a user object');

        it.todo('should return a user\'s preferences');
    });

    describe('[POST] - /api/users/:id/edit', () => {
        it.todo('should return status code 201 (created)');

        it.todo('should return a user object with new data');

        it.todo('should return a user\'s preferences');
    });

    describe('[GET] - /api/users/:id/causes', () => {
        it.todo('should return status code 200 (ok)');

        it.todo('should return a user\'s causes from the user id');
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

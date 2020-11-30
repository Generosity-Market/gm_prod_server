const { cause } = require('../../__mocks__');

jest.mock('../../utilities/awsUtils');

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
    // images,
    // Preferences,
} = cause;

describe('\nCause Endpoints\n', () => {
    let user;
    let user_id;
    let cause_id;
    let response;
    let token;

    beforeAll(async () => {
        user = await login();
        user_id = user.body.id;
        token = user.body.auth_token;
    });

    describe('[POST] - /api/causes', () => {
        beforeAll(async () => {
            response = await createItem('causes', { user_id, ...details }, token);
            cause_id = response.body.id;
        });

        it('should return status code 201 (Created)', () => {
            // console.log('Response: ', response);
            expect(response.statusCode).toEqual(201);
        });

        it('should return a newly created cause', () => {
            expect(response.body).toEqual(expect.objectContaining(details));
        });

        it('should contain a cause\'s preferences', () => {
            expect(response.body).toHaveProperty('Preferences');
        });
    });

    describe('[GET] - /api/causes', () => {
        beforeAll(async () => {
            response = await getAll('causes', token);
        });

        it('should return status code 200 (ok)', () => {
            expect(response.statusCode).toEqual(200);
        });

        it('should return at least one cause', () => {
            expect(response.body.length).toEqual(1);
        });

        it('should return a cause object', () => {
            expect(response.body[0]).toEqual(expect.objectContaining(details));
        });

        it('should contain a cause\'s preferences', () => {
            expect(response.body[0]).toHaveProperty('Preferences');
        });
    });

    describe('[GET] - /api/causes/:id', () => {
        beforeAll(async () => {
            response = await getById('causes', cause_id, token);
        });

        it('should return status code 200 (ok)', () => {
            expect(response.statusCode).toEqual(200);
        });

        it('should return exactly one cause', () => {
            expect(response.body.length).toBeUndefined();
        });

        it('should return a cause object', () => {
            expect(response.body).toEqual(expect.objectContaining(details));
        });

        it('should contain a cause\'s preferences', () => {
            expect(response.body).toHaveProperty('Preferences');
        });
    });

    describe('[PUT] - /api/causes/:id/edit', () => {
        beforeAll(async () => {
            response = await editItem('causes', cause_id, { ...editedDetails, ...editedPreferences }, token);
        });

        it('should return status code 201 (created)', async () => {
            expect(response.statusCode).toEqual(201);
        });

        it('should return a cause object with new data', async () => {
            const newDetails = { ...details, ...editedDetails };
            expect(response.body).toEqual(expect.objectContaining(newDetails));
        });

        it('should return a cause\'s preferences', () => {
            const { body } = response;
            const prefs = editedPreferences.Preferences;
            expect(body).toHaveProperty('Preferences');
            expect(body.Preferences).toEqual(expect.objectContaining({ ...prefs }));
        });
    });
});

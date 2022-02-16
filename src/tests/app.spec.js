const request = require('supertest');
const app = require('../../server');

const visit = (url) => request(app).get(url).send();

describe('\nApp startup\n', () => {
    let response;

    describe('[GET] - /api', () => {
        beforeAll(async () => {
            response = await visit('/api');
        });

        it('should return status code 302 (redirect', () => {
            expect(response.statusCode).toBe(302);
        });

        it('should return more info message', () => {
            expect(response.text).toEqual('Found. Redirecting to /api/docs');
        });
    });

    describe('[GET] - /invalidpath', () => {
        beforeAll(async () => {
            response = await visit('/invalidpath');
        });

        it('should return a status of 404 (Not Found)', () => {
            expect(response.statusCode).toBe(404);
        });

        it('should return not found message', () => {
            expect(response.text).toEqual('Not found');
        });
    });
});

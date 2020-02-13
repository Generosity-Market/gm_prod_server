const request = require('supertest');
const app = require('../../../server');

const visit = (url) => request(app).get(url).send();

describe('\nDocumentation Endpoint\n', () => {
    let response;

    beforeAll(async () => {
        response = await visit('/api/docs');
    });

    describe('[GET] - /api/docs', () => {
        it('should redirect to /api/docs/', () => {
            expect(response.statusCode).toEqual(301);
        });

        it('redirect should return status code 200 (ok)', async () => {
            response = await visit('/api/docs/');
            expect(response.statusCode).toEqual(200);
        });

        it('should be valid html', () => {
            expect(response.type).toEqual('text/html');
        });

        it('should have a document title of Swagger UI', () => {
            expect(response.text).toMatch(/Swagger UI/);
        });

        it.todo('should include all of the currently created routes');
    });
});

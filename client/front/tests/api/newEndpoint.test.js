// tests/api/newEndpoint.test.js
const request = require('supertest');
const app = require('../../server/app'); // Adjust the path to your Express app

describe('GET /new-endpoint', () => {
    it('should return 200 OK and expected response', async () => {
        const response = await request(app).get('/new-endpoint');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Success' }); // Adjust the expected response as needed
    });
});
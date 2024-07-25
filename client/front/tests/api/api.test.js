// tests/api/api.test.js
const request = require('supertest');
const app = require('../../server/app'); // Adjust the path to your Express app

describe('GET /auth-check', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/auth-check');
        expect(response.status).toBe(200);
    });
});
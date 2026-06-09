const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('Request API', () => {
  it('should reject unauthenticated access to requests', async () => {
    const res = await request(app).get('/api/requests');
    expect(res.status).to.equal(401);
  });
});

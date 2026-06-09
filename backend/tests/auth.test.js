const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('Auth endpoints', () => {
  it('should return 422 for invalid login payload', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'invalid' });
    expect(res.status).to.equal(422);
  });
});

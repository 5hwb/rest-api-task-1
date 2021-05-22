const request = require('supertest');
const app = require('../server');

describe('Spaceship API test cases', () => {
  it('should create a new spaceship', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 6, name: "Galactic Superstar 6", model: "Hujiko 8000"});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_created');
  });
});

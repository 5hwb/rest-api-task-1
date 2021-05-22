const request = require('supertest');
const { Status } = require('../api/models/spaceshipModel');
const app = require('../server');

describe('Spaceship API test cases', () => {

  // ===============================================
  // ===============================================
  // Spaceship creating
  // ===============================================
  // ===============================================

  it('should create a new spaceship', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 6, name: "Galactic Superstar 6", model: "Hujiko 8000"});
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(true);
  });

  // ===============================================
  // ===============================================
  // Spaceship reading
  // ===============================================
  // ===============================================

  it('should be able to read the new spaceship', async () => {
    const res = await request(app)
      .get('/spaceships/6');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).toEqual(6);
    expect(res.body.data).toHaveProperty('status');
    expect(res.body.data.status).toEqual(Status.Maintenance);
  });

  //////////////////////////////////////////////////
  // Error checking for read operations
  //////////////////////////////////////////////////

  it('should give an error when reading a nonexistent spaceship', async () => {
    const res = await request(app)
      .get('/spaceships/7');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  it('should give an error when reading with invalid URL parameters', async () => {
    const res = await request(app)
      .get('/spaceships/eqeqeq');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  // ===============================================
  // ===============================================
  // Spaceship updating
  // ===============================================
  // ===============================================

  it('should be able to update a spaceship\'s status to operational', async () => {
    const res = await request(app)
      .post('/spaceships/update/6')
      .send({id: 6, status: "operational"});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_updated');
    expect(res.body.spaceship_was_updated).toEqual(true);
  });

  it('should have changed the spaceship status to operational', async () => {
    const res = await request(app)
      .get('/spaceships/6');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).toEqual(6);
    expect(res.body.data).toHaveProperty('status');
    expect(res.body.data.status).toEqual(Status.Operational);
  });

  //////////////////////////////////////////////////
  // Error checking for update operations
  //////////////////////////////////////////////////

  it('should give an error when updating nonexistent spaceship', async () => {
    const res = await request(app)
      .post('/spaceships/update/7')
      .send({id: 7, status: "operational"});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("spaceship_was_updated");
    expect(res.body.spaceship_was_updated).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  it('should give an error when updating with invalid URL parameters', async () => {
    const res = await request(app)
      .post('/spaceships/update/qqeqeeqeq')
      .send({id: 7, status: "operational"});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("spaceship_was_updated");
    expect(res.body.spaceship_was_updated).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  it('should give an error when updating with invalid request body parameters (given status is not valid enum value)', async () => {
    const res = await request(app)
      .post('/spaceships/update/6')
      .send({id: 6, status: "DONKEY"});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("spaceship_was_updated");
    expect(res.body.spaceship_was_updated).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  it('should give an error when updating with invalid request body parameters (status is not given)', async () => {
    const res = await request(app)
      .post('/spaceships/update/6')
      .send({id: 6});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("spaceship_was_updated");
    expect(res.body.spaceship_was_updated).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  // ===============================================
  // ===============================================
  // Spaceship deleting 
  // ===============================================
  // ===============================================

  it('should be able to delete the spaceship', async () => {
    const res = await request(app)
      .delete('/spaceships/delete/6');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_deleted');
    expect(res.body.spaceship_was_deleted).toEqual(true);
  });

  //////////////////////////////////////////////////
  // Error checking for delete operations
  //////////////////////////////////////////////////

  it('should give an error when deleting a nonexistent spaceship', async () => {
    const res = await request(app)
      .delete('/spaceships/delete/7');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  it('should give an error when deleting with invalid URL parameters', async () => {
    const res = await request(app)
      .delete('/spaceships/delete/qeqqeqe');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

});
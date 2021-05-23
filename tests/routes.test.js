const request = require('supertest');
const { Status } = require('../api/models/spaceshipModel');
const app = require('../server');

/**
 * Test cases for the Spaceship and Location REST APIs.
 */
 describe('REST API Test Cases', () => {

  // ===============================================
  // ===============================================
  // Location creating
  // ===============================================
  // ===============================================

  it('should create a new location', async () => {
    const res = await request(app)
      .put('/locations/create')
      .send({"id": 10, "cityName": "Skydust", "planetName": "Pluto", "capacity": 2});
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('location_was_created');
    expect(res.body.location_was_created).toEqual(true);
  });

  // The following 3 locations will be used for the spaceship movement test cases 

  it('should create a 2nd new location', async () => {
    const res = await request(app)
      .put('/locations/create')
      .send({"id": 11, "cityName": "Outer Rings", "planetName": "Saturn", "capacity": 1});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('location_was_created');
    expect(res.body.location_was_created).toEqual(true);
  });
  it('should create a 3rd new location', async () => {
    const res = await request(app)
      .put('/locations/create')
      .send({"id": 12, "cityName": "The Mars City", "planetName": "Mars", "capacity": 5});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('location_was_created');
    expect(res.body.location_was_created).toEqual(true);
  });
  it('should create a 4th new location', async () => {
    const res = await request(app)
      .put('/locations/create')
      .send({"id": 13, "cityName": "Muh Ocean", "planetName": "Earth", "capacity": 2});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('location_was_created');
    expect(res.body.location_was_created).toEqual(true);
  });

  //////////////////////////////////////////////////
  // Error checking for create operations
  //////////////////////////////////////////////////

  it('should give an error if location ID is missing', async () => {
    const res = await request(app)
      .put('/locations/create')
      .send({"cityName": "Skydust", "planetName": "Pluto", "capacity": 2});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('location_was_created');
    expect(res.body.location_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  it('should give an error if city name is missing', async () => {
    const res = await request(app)
      .put('/locations/create')
      .send({"id": 10, "planetName": "Pluto", "capacity": 2});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('location_was_created');
    expect(res.body.location_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  it('should give an error if planet name is missing', async () => {
    const res = await request(app)
      .put('/locations/create')
      .send({"id": 10, "cityName": "Skydust", "capacity": 2});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('location_was_created');
    expect(res.body.location_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  it('should give an error if capacity info is missing', async () => {
    const res = await request(app)
      .put('/locations/create')
      .send({"id": 10, "cityName": "Skydust", "planetName": "Pluto"});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('location_was_created');
    expect(res.body.location_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  // ===============================================
  // ===============================================
  // Location reading
  // ===============================================
  // ===============================================

  it('should be able to read the new location', async () => {
    const res = await request(app)
      .get('/locations/10');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).toEqual(10);
    expect(res.body.data).toHaveProperty('cityName');
    expect(res.body.data.cityName).toEqual("Skydust");
    expect(res.body.data).toHaveProperty('planetName');
    expect(res.body.data.planetName).toEqual("Pluto");
    expect(res.body.data).toHaveProperty('capacity');
    expect(res.body.data.capacity).toEqual(2);
  });

  //////////////////////////////////////////////////
  // Error checking for read operations
  //////////////////////////////////////////////////

  it('should give an error when reading a nonexistent location', async () => {
    const res = await request(app)
      .get('/locations/20');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  it('should give an error when reading with invalid URL parameters', async () => {
    const res = await request(app)
      .get('/locations/eqeqeq');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  // ===============================================
  // ===============================================
  // Location deleting 
  // ===============================================
  // ===============================================

  it('should be able to delete the location', async () => {
    const res = await request(app)
      .delete('/locations/delete/10');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('location_was_deleted');
    expect(res.body.location_was_deleted).toEqual(true);
  });

  //////////////////////////////////////////////////
  // Error checking for delete operations
  //////////////////////////////////////////////////

  it('should give an error when deleting a nonexistent location', async () => {
    const res = await request(app)
      .delete('/locations/delete/20');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  it('should give an error when deleting with invalid URL parameters', async () => {
    const res = await request(app)
      .delete('/locations/delete/qeqqeqe');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  // ===============================================
  // ===============================================
  // Spaceship creating
  // ===============================================
  // ===============================================

  it('should create a new spaceship', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 6, name: "Galactic Superstar 6", model: "Hujiko 8000", currentLocationId: 12});
      
    expect(res.body).toEqual({ spaceship_was_created: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(true);
  });

  // The following 3 spaceships will be used for the spaceship movement test cases 

  it('should create a 2nd new spaceship', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 7, name: "Old thingo", model: "1st Gen Skycar (2030)", currentLocationId: 12});
    expect(res.body).toEqual({ spaceship_was_created: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(true);
  });
  it('should create a 3rd new spaceship', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 8, name: "Old thingo 2", model: "1st Gen Skycar (2030)", currentLocationId: 12});
    expect(res.body).toEqual({ spaceship_was_created: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(true);
  });
  it('should create a 4th new spaceship', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 9, name: "Old thingo 3", model: "1st Gen Skycar (2030)", currentLocationId: 12}); 
    expect(res.body).toEqual({ spaceship_was_created: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(true);
  });

  //////////////////////////////////////////////////
  // Error checking for create operations
  //////////////////////////////////////////////////

  it('should give an error if spaceship ID is missing', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({name: "Galactic Superstar 6", model: "Hujiko 8000"});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  it('should give an error if spaceship name is missing', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 6, model: "Hujiko 8000"});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  it('should give an error if spaceship model is missing', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 6, name: "Galactic Superstar 6"});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  it('should give an error if current location ID is missing', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 6, name: "Galactic Superstar 6", model: "Hujiko 8000"});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid parameters");
  });

  it('should give an error if the given current location ID is invalid', async () => {
    const res = await request(app)
      .put('/spaceships/create')
      .send({id: 6, name: "Galactic Superstar 6", model: "Hujiko 8000", currentLocationId: 20});
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_created');
    expect(res.body.spaceship_was_created).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid current location ID");
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
      .get('/spaceships/10');

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
      .post('/spaceships/update/10')
      .send({id: 10, status: "operational"});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("spaceship_was_updated");
    expect(res.body.spaceship_was_updated).toEqual(false);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Invalid ID");
  });

  it('should give an error when updating with invalid URL parameters', async () => {
    const res = await request(app)
      .post('/spaceships/update/qqeqeeqeq')
      .send({id: 10, status: "operational"});

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
      .delete('/spaceships/delete/10');

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

  // ===============================================
  // ===============================================
  // Spaceship moving
  // ===============================================
  // ===============================================

  it('spaceship with ID of 7 (currently at location with ID of 12) should be able to move to location with ID of 11', async () => {
    // Set spaceship to operational status
    await request(app)
      .post('/spaceships/update/7')
      .send({id: 7, status: "operational"});

    // Attempt the move
    const res = await request(app)
      .post('/spaceships/move/7/to-location/11');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spaceship_was_moved');
    expect(res.body.spaceship_was_moved).toEqual(true);
  });

  //////////////////////////////////////////////////
  // Error checking for move operation
  //////////////////////////////////////////////////

  it('spaceship with ID of 7 (currently at location with ID of 11) should not be able to move to location with ID of 11 again', async () => {
    // Attempt the move
    const res = await request(app)
      .post('/spaceships/move/7/to-location/11');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_moved');
    expect(res.body.spaceship_was_moved).toEqual(false);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual("Internal error");
  });

  it('spaceship with ID of 8 (currently at location with ID of 12) should not be able to move to location with ID of 11 as its capacity has been exceeded', async () => {
    // Set spaceship to operational status
    await request(app)
      .post('/spaceships/update/8')
      .send({id: 8, status: "operational"});

    // Attempt the move
    const res = await request(app)
      .post('/spaceships/move/8/to-location/11');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_moved');
    expect(res.body.spaceship_was_moved).toEqual(false);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual("Internal error");
  });

  it('spaceship with ID of 9 (currently at location with ID of 12) should not be able to move to location with ID of 13 as its status is not Operational', async () => {
    // Attempt the move
    const res = await request(app)
      .post('/spaceships/move/9/to-location/13');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_moved');
    expect(res.body.spaceship_was_moved).toEqual(false);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual("Internal error");
  });

  it('should not move non-existent spaceship', async () => {
    // Attempt the move
    const res = await request(app)
      .post('/spaceships/move/100/to-location/11');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_moved');
    expect(res.body.spaceship_was_moved).toEqual(false);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual("Invalid IDs");
  });

  it('should not move spaceship with ID of 7 (currently at location with ID of 11) to non-existent location', async () => {
    // Attempt the move
    const res = await request(app)
      .post('/spaceships/move/7/to-location/50');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('spaceship_was_moved');
    expect(res.body.spaceship_was_moved).toEqual(false);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual("Invalid IDs");
  });


});

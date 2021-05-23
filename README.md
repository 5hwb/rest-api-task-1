# REST API Task 1

Implementation of a REST API for a hypothetical spacecraft logistics system.

## Required tools

* Node.js
* Node Package Manager (NPM)
* `curl` command line utility

### Node.js dependencies

The following libraries and packages were used:

* Express - web framework
* Nodemon - automatically restart the app when changes are made
* TypeScript - type-checked version of JavaScript
* Jest - testing framework
* Supertest - library for testing HTTP responses 

To view the dependencies, open `package.json`.

## Setup

1. Run `npm install` in the terminal to install all required dependencies automatically.
2. Compile the TypeScript files with `npx tsc`.
3. Run `npm test` to execute the Jest test cases in the `tests/` directory.

## Run the API server

1. Run `npm run start` to start the server.
2. Before executing PUT or POST requests, set the header 'Content-Type' to 'application/json' to ensure the request body is formatted properly.

## API Documentation

Parameters are generally passed through the request body, except if only IDs are involved, in which they are passed through the URL. The request body must be in JSON format with all parameter names represented as strings.

To experiment with the REST API, run `add_sample_data.sh` in the terminal to add some sample locations and spaceships to the system.

### Get all locations

Get the information on all locations: ID, city name, planet name, capacity, number of spaceships at this location, and their IDs.

* **URL**: http://localhost:3000/locations
* **HTTP request method**: GET
* **Example**: `curl -X GET -H 'Content-Type: application/json' -i http://localhost:3000/locations`

### Create a location

Create a new location.

* **URL**: http://localhost:3000/locations/create
* **HTTP request method**: PUT
* **Request body format**: 
  * `id`: Numerical ID of location
  * `cityName`: City name
  * `planetName`: Planet name
  * `capacity`: Maximum number of spaceships at this location
* **Example**: `curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/locations/create --data '{"id": 1, "cityName": "Tinyroast", "planetName": "Mercury", "capacity": 1}'`
* **Error checking**: Returns an 'Invalid parameters' error if the request body is missing 1 or more of the required parameters.

### Read a location

Get the information on a particular location: ID, city name, planet name, capacity, number of spaceships at this location, and their IDs.

* **URL**: http://localhost:3000/locations/:locationID (':locationID' is the location's numerical ID)
* **HTTP request method**: GET
* **Example**: `curl -X GET -H 'Content-Type: application/json' -i http://localhost:3000/locations/1` - Get information on the location with an ID of 1.
* **Error checking**: Returns an 'Invalid ID' error if the ID of the given location does not exist. 

### Delete a location

Delete a particular location.

* **URL**: http://localhost:3000/locations/delete/:locationID (':locationID' is the location's numerical ID)
* **HTTP request method**: DELETE
* **Example**: `curl -X DELETE -H 'Content-Type: application/json' -i http://localhost:3000/locations/delete/1` - Delete the location with an ID of 1.
* **Error checking**: Returns an 'Invalid ID' error if the ID of the given location does not exist, or a 'Registered spaceships detected' error if at least 1 spaceship is registered at this location.

### Get all spaceships

Get the information on all spaceships: ID, name, model, status and current location.

* **URL**: http://localhost:3000/spaceships
* **HTTP request method**: GET
* **Example**: `curl -X GET -H 'Content-Type: application/json' -i http://localhost:3000/spaceships`

### Create a spaceship

Create a new spaceship. By default, the status of all new spaceships will be set to 'Maintenance'.

* **URL**: http://localhost:3000/spaceships/create
* **HTTP request method**: PUT
* **Request body format**: 
  * `id`: Numerical ID of spaceship
  * `name`: Spaceship name
  * `model`: Spaceship model
  * `currentLocationId`: Numerical ID of the spaceship's current location
* **Example**: `curl -X PUT -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/create --data '{"id": 1, "name": "Galactic Superstar 1", "model": "Qwertytron 9000", "currentLocationId": 3}'`
* **Error checking**: Returns an 'Invalid parameters' error if the request body is missing 1 or more of the required parameters, or an 'Invalid current location ID' error if the ID of the given current location does not exist. 

### Read a spaceship

Get the information on a particular spaceship: ID, name, model, status and current location.

* **URL**: http://localhost:3000/spaceships/:spaceshipID (':spaceshipID' is the spaceship's numerical ID)
* **HTTP request method**: GET
* **Example**: `curl -X GET -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/1` - Get information on the spaceship with an ID of 1.
* **Error checking**: Returns an 'Invalid ID' error if the ID of the given spaceship does not exist. 

### Update a spaceship's status

Change the status of a particular spaceship.

* **URL**: http://localhost:3000/spaceships/update/:spaceshipID (':spaceshipID' is the spaceship's numerical ID)
* **HTTP request method**: POST
* **Request body format**: 
  * `id`: Numerical ID of spaceship
  * `status`: The new status of the spaceship in string format
    * Valid status inputs: 'decommissioned', 'maintenance' and 'operational'
* **Example**: `curl -X POST -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/update/1 --data '{"id": 1, "status": "operational"}'` - Set the spaceship with an ID of 1 to operational status.
* **Error checking**: Returns an 'Invalid ID' error if the ID of the given spaceship does not exist, or an 'Invalid parameters' error if the new status in the request body is not a valid status input.

### Move a spaceship to a new location

Move a particular spaceship to a certain location in the galaxy.

* **URL**: http://localhost:3000/spaceships/move/:spaceshipID/to-location/:newLocationID (':spaceshipID' is the spaceship's numerical ID, ':newLocationID' is the new location's numerical ID)
* **HTTP request method**: POST
* **Example**: `curl -X POST -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/move/1/to-location/4` - Move the spaceship with an ID of 1 to the location with an ID of 4.
* **Error checking**: Returns an 'Invalid IDs' error if the ID of either the given spaceship or location do not exist, or a 'Cannot move' error if the following scenarios occurred: spaceship status not set to Operational, spaceship tries to move into a location it's currently at, location's capacity has been exceeded.

### Delete a spaceship

Delete a particular spaceship.

* **URL**: http://localhost:3000/spaceships/delete/:spaceshipID (':spaceshipID' is the spaceship's numerical ID)
* **HTTP request method**: DELETE
* **Example**: `curl -X DELETE -H 'Content-Type: application/json' -i http://localhost:3000/spaceships/delete/1` - Delete the spaceship with an ID of 1.
* **Error checking**: Returns an 'Invalid ID' error if the ID of the given spaceship does not exist. 
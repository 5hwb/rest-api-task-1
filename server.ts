// Required imports
import express from 'express';
import spaceshipRoutes from './api/routes/spaceshipRoutes';
import locationRoutes from './api/routes/locationRoutes';
import SpaceshipDatabase from './api/databases/spaceshipDatabase';

// Express setup variables
let app = express();
let port = 3000;

// Set up middleware for formatting request body data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up mock databases
const spaceshipDatabase: SpaceshipDatabase = new SpaceshipDatabase();

// Register the URL routes
spaceshipRoutes(app, spaceshipDatabase);
locationRoutes(app);

// Start the API server at the given port
app.listen(port);
console.log("RESTful API server is now running at port " + port);

module.exports = app;
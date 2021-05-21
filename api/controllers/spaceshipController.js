'use strict';

const { Status, Spaceship } = require('../models/spaceshipModel');

let spaceshipDB = new Map();

function isValidId(id, spaceshipDB) {
  let parsedID = parseInt(id);
  if (!isNaN(parsedID) && spaceshipDB.has(parsedID)) {
    return true;
  }
  return false;
}

exports.defaultUrlAction = function(req, res) {
  res.send("You've entered the default URL. Go to http://localhost:3000/spaceships to view data on all the spaceships.");
};

exports.listSpaceships = function(req, res) {
  console.log("listSpaceships");
  console.log(req.headers['content-type']);

  let allSpaceships = [];
  for (let entry of spaceshipDB.values()) {
    allSpaceships.push(entry);
  }
  res.json({ data: allSpaceships });
};

exports.createSpaceship = function(req, res) {
  console.log("createSpaceship");
  console.log(req.headers['content-type']);

  // Get values from request body and create new Spaceship instance to add
  if (req.body.id !== undefined && req.body.name !== undefined && req.body.model !== undefined) {
    let newSpaceship = new Spaceship(req.body.id, req.body.name, req.body.model);
    spaceshipDB.set(req.body.id, newSpaceship);
    console.log("Added '" + newSpaceship + "' to the list!");
    res.json({ spaceship_was_created: true });
  } else {
    res.status(400).json({ spaceship_was_created: false, error: "Invalid ID", message: "ID does not exist in the system" });
  }
};

exports.readSpaceship = function(req, res) {
  console.log("readSpaceship");
  console.log(req.headers['content-type']);

  // Check the ID for validity 
  if (isValidId(req.params.spaceshipID, spaceshipDB)) {
    // Get the element with the given ID
    let spaceshipID = parseInt(req.params.spaceshipID);
    let spaceship = spaceshipDB.get(spaceshipID);
    res.json({ data: spaceship });
  } else {
    res.status(400).json({ error: "Invalid ID", message: "ID does not exist in the system" });
  }
};

exports.updateSpaceship = function(req, res) {
  console.log("updateSpaceship");
  console.log(req.headers['content-type']);

  // Check the ID for validity 
  if (isValidId(req.params.spaceshipID, spaceshipDB)) {
    // Get the element with the given ID
    let spaceshipID = parseInt(req.params.spaceshipID);
    let spaceship = spaceshipDB.get(spaceshipID);
    
    console.log(req.body);

    // Modify element contents
    // Currently, updates change only the name and model 
    if (req.body.id !== undefined && req.body.name !== undefined && req.body.model !== undefined) {
      spaceship.name = req.body.name;
      spaceship.model = req.body.model;
      res.json({ spaceship_was_updated: true, new_data: spaceship });
    } else {
      res.status(400).json({ spaceship_was_updated: false, error: "Invalid parameters", message: "1 or more required parameters are missing" });
    }
  } else {
    res.status(400).json({ spaceship_was_updated: false, error: "Invalid ID", message: "ID does not exist in the system" });
  }
  
};

exports.deleteSpaceship = function(req, res) {
  console.log("deleteSpaceship");
  console.log(req.headers['content-type']);  

    // Check the ID for validity 
    if (isValidId(req.params.spaceshipID, spaceshipDB)) {
      // Delete the element with the given ID
      let spaceshipID = parseInt(req.params.spaceshipID);
      spaceshipDB.delete(spaceshipID);
      res.json({ spaceship_was_deleted: true });
    } else {
      res.status(400).json({ spaceship_was_deleted: false, error: "Invalid ID", message: "ID does not exist in the system" });
    }
};
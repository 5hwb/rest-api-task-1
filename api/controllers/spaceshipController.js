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
  res.send("Hello World ya drongo");
};

exports.listSpaceships = function(req, res) {
  console.log("listSpaceships");
  console.log(req.headers['content-type']);

  let allSpaceships = [];
  for (let entry of spaceshipDB.values()) {
    allSpaceships.push(entry);
  }
  res.json({ db: allSpaceships });
};

exports.createSpaceship = function(req, res) {
  console.log("createSpaceship");
  console.log(req.headers['content-type']);

  // Get values from request body and create new Spaceship instance to add
  if (req.body.id !== undefined && req.body.name !== undefined && req.body.model !== undefined) {
    let newSpaceship = new Spaceship(req.body.id, req.body.name, req.body.model);
    spaceshipDB.set(req.body.id, newSpaceship);
    console.log("Added '" + newSpaceship + "' to the list!");
    res.json({ do_you_know: "MAKE IT!" });
  } else {
    res.send("Invalid ID");
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
    res.json({ do_you_know: "READ IT!" , element: spaceship });
  } else {
    res.send("Invalid ID");
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
      res.json({ do_you_know: "UPDATE IT!", contents: req.body });
    } else {
      res.send("Invalid parameters");
    }
  } else {
    res.send("Invalid ID");
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
      res.json({ do_you_know: "deleteit." });
    } else {
      res.send("Invalid ID");
    }
};
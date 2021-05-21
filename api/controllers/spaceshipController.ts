'use strict';

import { Status, Spaceship } from "../models/spaceshipModel";

export default class SpaceshipController {

  spaceshipDB: Map<number, Spaceship>;

  constructor() {
    this.spaceshipDB = new Map();
  }

  isValidId(id: string, spaceshipDB: Map<number, Spaceship>): boolean {
    let parsedID = parseInt(id);
    if (!isNaN(parsedID) && spaceshipDB.has(parsedID)) {
      return true;
    }
    return false;
  }

  defaultUrlAction = (req: any, res: any) => {
    res.send("You've entered the default URL. Go to http://localhost:3000/spaceships to view data on all the spaceships.");
  }

  listSpaceships = (req: any, res: any) => {
    console.log("listSpaceships");
    console.log(req.headers['content-type']);

    let allSpaceships = [];
    for (let entry of this.spaceshipDB.values()) {
      allSpaceships.push(entry);
    }
    res.json({ data: allSpaceships });
  }

  createSpaceship = (req: any, res: any) => {
    console.log("createSpaceship");
    console.log(req.headers['content-type']);

    // Get values from request body and create new Spaceship instance to add
    if (req.body.id !== undefined && req.body.name !== undefined && req.body.model !== undefined) {
      let newSpaceship = new Spaceship(req.body.id, req.body.name, req.body.model);
      this.spaceshipDB.set(req.body.id, newSpaceship);
      console.log("Added '" + newSpaceship + "' to the list!");
      res.json({ spaceship_was_created: true });
    } else {
      res.status(400).json({ spaceship_was_created: false, error: "Invalid ID", message: "ID does not exist in the system" });
    }
  }

  readSpaceship = (req: any, res: any) => {
    console.log("readSpaceship");
    console.log(req.headers['content-type']);

    // Check the ID for validity 
    if (this.isValidId(req.params.spaceshipID, this.spaceshipDB)) {
      // Get the element with the given ID
      let spaceshipID = parseInt(req.params.spaceshipID);
      let spaceship = this.spaceshipDB.get(spaceshipID);
      res.json({ data: spaceship });
    } else {
      res.status(400).json({ error: "Invalid ID", message: "ID does not exist in the system" });
    }
  }

  updateSpaceship = (req: any, res: any) => {
    console.log("updateSpaceship");
    console.log(req.headers['content-type']);

    // Check the ID for validity 
    if (this.isValidId(req.params.spaceshipID, this.spaceshipDB)) {
      // Get the element with the given ID.
      // Note: at this point, the ID is definitely a valid one, hence the use of the non-null assertion operator
      let spaceshipID: number = parseInt(req.params.spaceshipID);
      let spaceship: Spaceship = this.spaceshipDB.get(spaceshipID)!;
      
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
    
  }

  deleteSpaceship = (req: any, res: any) => {
    console.log("deleteSpaceship");
    console.log(req.headers['content-type']);  

      // Check the ID for validity 
      if (this.isValidId(req.params.spaceshipID, this.spaceshipDB)) {
        // Delete the element with the given ID
        let spaceshipID = parseInt(req.params.spaceshipID);
        this.spaceshipDB.delete(spaceshipID);
        res.json({ spaceship_was_deleted: true });
      } else {
        res.status(400).json({ spaceship_was_deleted: false, error: "Invalid ID", message: "ID does not exist in the system" });
      }
  }
}
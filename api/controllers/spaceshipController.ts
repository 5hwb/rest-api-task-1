'use strict';

import { Request, Response } from "express";
import { Status, Spaceship } from "../models/spaceshipModel";

/**
 * Handles user-inputted URLs relating to spaceships.
 */
export default class SpaceshipController {

  // Key-value store for the spaceship data (this will simulate a database)
  spaceshipDB: Map<number, Spaceship>;

  constructor() {
    this.spaceshipDB = new Map();
  }

  /**
   * Check if the given string represents a valid ID in the database.
   * @param id The ID to check
   * @param spaceshipDB Database to examine
   * @returns true if 'id' is present in 'spaceshipDB', false otherwise
   */
  isValidId(id: string, spaceshipDB: Map<number, Spaceship>): boolean {
    let parsedID = parseInt(id);
    if (!isNaN(parsedID) && spaceshipDB.has(parsedID)) {
      return true;
    }
    return false;
  }

  /**
   * Send a plain HTML response to direct the user to the /spaceships URL.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  defaultUrlAction = (req: Request, res: Response) => {
    res.send("You've entered the default URL. Go to http://localhost:3000/spaceships to view data on all the spaceships.");
  }

  /**
   * List all spaceships in the database.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  listSpaceships = (req: Request, res: Response) => {
    console.log("listSpaceships");
    console.log(req.headers['content-type']);

    let allSpaceships = [];
    for (let entry of this.spaceshipDB.values()) {
      allSpaceships.push(entry);
    }
    res.json({ data: allSpaceships });
  }

  /**
   * Add a new spaceship to the database.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  createSpaceship = (req: Request, res: Response) => {
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

  /**
   * Get the spaceship with the given ID.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  readSpaceship = (req: Request, res: Response) => {
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

  /**
   * Update the spaceship with the given ID.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  updateSpaceship = (req: Request, res: Response) => {
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

  /**
   * Delete the spaceship with the given ID.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  deleteSpaceship = (req: Request, res: Response) => {
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
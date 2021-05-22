'use strict';

import { Request, Response } from "express";
import SpaceshipDatabase from "../databases/spaceshipDatabase";
import { Status, Spaceship, stringToStatus } from "../models/spaceshipModel";

/**
 * Handles user-inputted URLs relating to spaceships.
 */
export default class SpaceshipController {

  // Instance of spaceship database
  database: SpaceshipDatabase;

  /**
   * Create a new SpaceshipController.
   * @param database The spaceship database instance to use
   */
  constructor(database: SpaceshipDatabase) {
    this.database = database;
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
    for (let entry of this.database.getValues()) {
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
      this.database.add(newSpaceship);
      console.log("Added '" + newSpaceship + "' to the list!");
      res.json({ spaceship_was_created: true });
    } else {
      res.status(400).json({ spaceship_was_created: false, error: "Invalid parameters", message: "Required parameters to add a new location were not identified" });
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
    if (this.database.isValidId(req.params.spaceshipID)) {
      // Get the element with the given ID
      let spaceshipID = parseInt(req.params.spaceshipID);
      let spaceship = this.database.get(spaceshipID);
      res.json({ data: spaceship });
    } else {
      res.status(400).json({ error: "Invalid ID", message: "ID does not exist in the system" });
    }
  }

  /**
   * Update the status of the spaceship with the given ID.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  updateSpaceship = (req: Request, res: Response) => {
    console.log("updateSpaceship");
    console.log(req.headers['content-type']);

    // Check the ID for validity 
    if (this.database.isValidId(req.params.spaceshipID)) {
      // Get the element with the given ID.
      // Note: at this point, the ID is definitely a valid one, hence the use of the non-null assertion operator
      let spaceshipID: number = parseInt(req.params.spaceshipID);
      let spaceship: Spaceship = this.database.get(spaceshipID)!;
      
      console.log(req.body);

      // Modify spaceship status
      let newStatus: string = req.body.status;
      if (stringToStatus(newStatus) != Status.Undefined) {
        spaceship.status = stringToStatus(newStatus);
        res.json({ spaceship_was_updated: true, new_data: spaceship });
      } else {
        res.status(400).json({ spaceship_was_updated: false, error: "Invalid parameters", message: "State parameter is either missing or invalid" });
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
      if (this.database.isValidId(req.params.spaceshipID)) {

        // Delete the element with the given ID
        let spaceshipID = parseInt(req.params.spaceshipID);
        this.database.delete(spaceshipID);
        res.json({ spaceship_was_deleted: true });

      } else {
        res.status(400).json({ spaceship_was_deleted: false, error: "Invalid ID", message: "ID does not exist in the system" });
      }
  }
}
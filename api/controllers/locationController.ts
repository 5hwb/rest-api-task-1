'use strict';

import { Request, Response } from "express";
import MockDatabase from "../databases/MockDatabase";
import { Location } from "../models/locationModel";

/**
 * Handles user-inputted URLs relating to locations.
 */
export default class LocationController {

  // Instance of location database
  database: MockDatabase;

  /**
   * Create a new LocationController.
   * @param database The location database instance to use
   */
   constructor(database: MockDatabase) {
    this.database = database;
  }

  /**
   * List all locations in the database.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  listLocations = (req: Request, res: Response) => {
    //console.log("listLocations");
    //console.log(req.headers['content-type']);

    let allLocations = [];
    for (let entry of this.database.getValues()) {
      allLocations.push(entry);
    }
    res.json({ data: allLocations });
  }

  /**
   * Add a new location to the database.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  createLocation = (req: Request, res: Response) => {
    //console.log("createLocation");
    //console.log(req.headers['content-type']);

    // Get values from request body and create new Location instance to add
    if (req.body.id !== undefined && req.body.cityName !== undefined && req.body.planetName !== undefined && req.body.capacity !== undefined) {
      let newLocation = new Location(req.body.id, req.body.cityName, req.body.planetName, req.body.capacity);
      this.database.add(newLocation);
      //console.log("Added '" + newLocation + "' to the list!");
      res.json({ location_was_created: true });
    } else {
      res.status(400).json({ location_was_created: false, error: "Invalid parameters", message: "Required parameters to add a new location were not identified" });
    }
  }

  /**
   * Get the location with the given ID.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  readLocation = (req: Request, res: Response) => {
    //console.log("readLocation");
    //console.log(req.headers['content-type']);

    // Check the ID for validity 
    if (this.database.isValidId(req.params.locationID)) {
      // Get the element with the given ID
      let locationID = parseInt(req.params.locationID);
      let location = this.database.get(locationID);
      res.json({ data: location });
    } else {
      res.status(400).json({ error: "Invalid ID", message: "ID does not exist in the system" });
    }
  }

  /**
   * Delete the location with the given ID.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  deleteLocation = (req: Request, res: Response) => {
    //console.log("deleteLocation");
    //console.log(req.headers['content-type']);  

      // Check the ID for validity 
      if (this.database.isValidId(req.params.locationID)) {

        // Delete the element with the given ID
        let locationID = parseInt(req.params.locationID);
        this.database.delete(locationID);
        res.json({ location_was_deleted: true });

      } else {
        res.status(400).json({ location_was_deleted: false, error: "Invalid ID", message: "ID does not exist in the system" });
      }
  }
}
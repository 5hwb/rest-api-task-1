'use strict';

import { Request, Response } from "express";
import { Location } from "../models/locationModel";

/**
 * Handles user-inputted URLs relating to locations.
 */
export default class LocationController {

  // Key-value store for the location data (this will simulate a database)
  locationDB: Map<number, Location>;

  constructor() {
    this.locationDB = new Map();
  }

  /**
   * Check if the given string represents a valid ID in the database.
   * @param id The ID to check
   * @param locationDB Database to examine
   * @returns true if 'id' is present in 'locationDB', false otherwise
   */
  isValidId(id: string, locationDB: Map<number, Location>): boolean {
    let parsedID = parseInt(id);
    if (!isNaN(parsedID) && locationDB.has(parsedID)) {
      return true;
    }
    return false;
  }

  /**
   * List all locations in the database.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  listLocations = (req: Request, res: Response) => {
    console.log("listLocations");
    console.log(req.headers['content-type']);

    let allLocations = [];
    for (let entry of this.locationDB.values()) {
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
    console.log("createLocation");
    console.log(req.headers['content-type']);

    // Get values from request body and create new Location instance to add
    if (req.body.id !== undefined && req.body.cityName !== undefined && req.body.planetName !== undefined && req.body.capacity !== undefined) {
      let newLocation = new Location(req.body.id, req.body.cityName, req.body.planetName, req.body.capacity);
      this.locationDB.set(req.body.id, newLocation);
      console.log("Added '" + newLocation + "' to the list!");
      res.json({ location_was_created: true });
    } else {
      res.status(400).json({ location_was_created: false, error: "Invalid ID", message: "ID does not exist in the system" });
    }
  }

  /**
   * Get the location with the given ID.
   * @param req HTTP request object
   * @param res HTTP response object
   */
  readLocation = (req: Request, res: Response) => {
    console.log("readLocation");
    console.log(req.headers['content-type']);

    // Check the ID for validity 
    if (this.isValidId(req.params.locationID, this.locationDB)) {
      // Get the element with the given ID
      let locationID = parseInt(req.params.locationID);
      let location = this.locationDB.get(locationID);
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
    console.log("deleteLocation");
    console.log(req.headers['content-type']);  

      // Check the ID for validity 
      if (this.isValidId(req.params.locationID, this.locationDB)) {

        // Delete the element with the given ID
        let locationID = parseInt(req.params.locationID);
        this.locationDB.delete(locationID);
        res.json({ location_was_deleted: true });

      } else {
        res.status(400).json({ location_was_deleted: false, error: "Invalid ID", message: "ID does not exist in the system" });
      }
  }
}
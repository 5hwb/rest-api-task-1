import { Location } from "../models/locationModel";

/**
 * Simulate a database for locations.
 */
 export default class LocationDatabase {

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
  isValidId(id: string): boolean {
    let parsedID = parseInt(id);
    if (!isNaN(parsedID) && this.locationDB.has(parsedID)) {
      return true;
    }
    return false;
  }
  
  /**
   * Get all values in the database.
   * @returns All values in the DB
   */
  getValues(): Location[] {
    return Array.from(this.locationDB.values());
  }

  /**
   * Get the element with the given ID.
   * @param id The ID of the element to get
   * @returns The requested element. If ID is not in DB, return undefined. 
   */
  get(id: number): Location | undefined {
    return this.locationDB.get(id);
  }

  /**
   * Add a Location instance to the DB.
   * @param newItem The Location instance to add
   */
  add(newItem: Location) {
    this.locationDB.set(newItem.id, newItem);
  }

  /**
   * Delete the element with the given ID.
   * @param id The ID of the element to delete
   * @returns True if the element was deleted, false otherwise. 
   */
   delete(id: number): boolean {
    return this.locationDB.delete(id);
  }
}
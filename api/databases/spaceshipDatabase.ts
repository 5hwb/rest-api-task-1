import { Spaceship } from "../models/spaceshipModel";

/**
 * Simulate a database for spaceships.
 */
 export default class SpaceshipDatabase {

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
  isValidId(id: string): boolean {
    let parsedID = parseInt(id);
    if (!isNaN(parsedID) && this.spaceshipDB.has(parsedID)) {
      return true;
    }
    return false;
  }
  
  /**
   * Get all values in the database.
   * @returns All values in the DB
   */
  getValues(): Spaceship[] {
    return Array.from(this.spaceshipDB.values());
  }

  /**
   * Get the element with the given ID.
   * @param id The ID of the element to get
   * @returns The requested element. If ID is not in DB, return undefined. 
   */
  get(id: number): Spaceship | undefined {
    return this.spaceshipDB.get(id);
  }

  /**
   * Add a Spaceship instance to the DB.
   * @param newItem The Spaceship instance to add
   */
  add(newItem: Spaceship) {
    this.spaceshipDB.set(newItem.id, newItem);
  }

  /**
   * Delete the element with the given ID.
   * @param id The ID of the element to delete
   * @returns True if the element was deleted, false otherwise. 
   */
   delete(id: number): boolean {
    return this.spaceshipDB.delete(id);
  }
}
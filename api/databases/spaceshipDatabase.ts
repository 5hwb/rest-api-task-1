import MockDatabase from "./MockDatabase";
import { Spaceship } from "../models/spaceshipModel";

/**
 * Simulate a database for spaceships.
 */
 export default class SpaceshipDatabase implements MockDatabase {

  // Key-value store for the spaceship data
  spaceshipDB: Map<number, Spaceship>;

  constructor() {
    this.spaceshipDB = new Map();
  }

  isValidId(id: string): boolean {
    let parsedID = parseInt(id);
    if (!isNaN(parsedID) && this.spaceshipDB.has(parsedID)) {
      return true;
    }
    return false;
  }
  
  getValues(): Spaceship[] {
    return Array.from(this.spaceshipDB.values());
  }

  get(id: number): Spaceship | undefined {
    return this.spaceshipDB.get(id);
  }

  add(newItem: Spaceship) {
    this.spaceshipDB.set(newItem.id, newItem);
  }

  delete(id: number): boolean {
    return this.spaceshipDB.delete(id);
  }
}
import MockDatabase from "./MockDatabase";
import { Location } from "../models/locationModel";

/**
 * Simulate a database for locations.
 */
export default class LocationDatabase implements MockDatabase {
  // Key-value store for the location data (this will simulate a database)
  locationDB: Map<number, Location>;

  constructor() {
    this.locationDB = new Map();
  }

  isValidId(id: string): boolean {
    let parsedID = parseInt(id);
    if (!isNaN(parsedID) && this.locationDB.has(parsedID)) {
      return true;
    }
    return false;
  }

  getValues(): Location[] {
    return Array.from(this.locationDB.values());
  }

  get(id: number): Location | undefined {
    return this.locationDB.get(id);
  }

  add(newItem: Location) {
    this.locationDB.set(newItem.id, newItem);
  }

  delete(id: number): boolean {
    return this.locationDB.delete(id);
  }
}

'use strict';

/**
 * Models relating to location
 */

/**
 * Location data model
 */
export class Location {
  id: number;
  cityName: string;
  planetName: string;
  capacity: number;

  /**
   * Create a new Location instance.
   */
  constructor(id: number, cityName: string, planetName: string, capacity: number) {
    this.id = id;
    this.cityName = cityName;
    this.planetName = planetName;
    this.capacity = capacity;
  }

  /**
   * Convert the Location instance into its string representation.
   * @returns String representation
   */
  toString(): string {
    return "id: " + this.id + ", cityName: " + this.cityName + ", planetName: " + this.planetName + ", capacity: " + this.capacity;
  }
}
'use strict';

import { Spaceship } from "./spaceshipModel";

/**
 * Models relating to location
 */

/**
 * Location data model
 */
export class Location {
  // Basic location info
  id: number;
  cityName: string;
  planetName: string;

  // Maximum number of spaceships able to park at this location
  readonly capacity: number;

  // Registry of spaceships stationed at this location
  spaceshipRegistry: Map<number, Spaceship>;

  /**
   * Create a new Location instance.
   */
  constructor(id: number, cityName: string, planetName: string, capacity: number) {
    this.id = id;
    this.cityName = cityName;
    this.planetName = planetName;
    this.capacity = capacity;
    this.spaceshipRegistry = new Map();
  }

  /**
   * Convert the Location instance into its string representation.
   * @returns String representation
   */
  toString(): string {
    return "id: " + this.id + ", cityName: " + this.cityName + ", planetName: " + this.planetName + ", capacity: " + this.capacity;
  }

  /**
   * Add the given spaceship to the location registry.
   * @param spaceship Spaceship to add to registry
   * @returns True if spaceship was added, false otherwise
   */
  addIncomingSpaceship(spaceship: Spaceship): boolean {
    if ((spaceship !== undefined && spaceship !== null) 
      && (this.spaceshipRegistry.size + 1 <= this.capacity)
      && (!this.spaceshipRegistry.has(spaceship.id))) {
      
      this.spaceshipRegistry.set(spaceship.id, spaceship);
      return true;
    }
    return false;
  }

  /**
   * Remove the given spaceship from the location registry.
   * @param spaceship Spaceship to remove from registry
   * @returns True if spaceship was removed, false otherwise
   */
  removeOutgoingSpaceship(spaceship: Spaceship): boolean {
    if ((spaceship !== undefined && spaceship !== null)
      && this.spaceshipRegistry.has(spaceship.id)) {
      
      this.spaceshipRegistry.delete(spaceship.id);
      return true;
    }
    return false;
  }
}
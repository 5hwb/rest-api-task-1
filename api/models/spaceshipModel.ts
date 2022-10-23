"use strict";

import { Location } from "./locationModel";

/**
 * Models relating to spaceships
 */

/**
 * Indicates the current status of the Spaceship.
 */
export enum Status {
  Undefined = 0,
  Decommissioned = 1,
  Maintenance = 2,
  Operational = 3,
}

/**
 * Convert the given string to a Status enum.
 * @param str String to convert
 * @returns Equivalent Status enum
 */
export function stringToStatus(str: string): Status {
  switch (str) {
    case "decommissioned":
      return Status.Decommissioned;
    case "maintenance":
      return Status.Maintenance;
    case "operational":
      return Status.Operational;
    default:
      return Status.Undefined;
  }
}

/**
 * Spaceship data model
 */
export class Spaceship {
  // Basic spaceship info
  id: number;
  name: string;
  model: string;

  // Current spaceship status
  status: Status;

  // Current location of this spaceship
  currentLocation: Location;

  /**
   * Create a new Spaceship instance.
   * @param id Spaceship ID
   * @param name Name of spaceship
   * @param model Model of spaceship
   */
  constructor(id: number, name: string, model: string, location: Location) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.status = Status.Maintenance;
    this.currentLocation = location;

    // Register this Spaceship with the current location
    if (this.currentLocation !== undefined) {
      this.currentLocation.addIncomingSpaceship(this);
    }
  }

  /**
   * Convert the Spaceship instance into its string representation.
   * @returns String representation
   */
  toString(): string {
    return (
      "id: " +
      this.id +
      ", name: " +
      this.name +
      ", model: " +
      this.model +
      ", status: " +
      this.status +
      ", currentLocation: { " +
      this.currentLocation +
      " }"
    );
  }

  /**
   * Move the Spaceship to the given new location.
   * Only Spaceships with operational status can be moved.
   * @param newLocation New location of the spaceship
   */
  moveLocation(newLocation: Location): void {
    // Null check
    if (newLocation !== undefined && newLocation !== null) {
      // Check if spacecraft is already at the new location
      if (newLocation.spaceshipRegistry.has(this.id)) {
        throw "Spacecraft is already at this location";
      }
      // Check if spaceship status is not operational
      else if (this.status != Status.Operational) {
        throw "Spacecraft status is not operational";
      }
      // Check if the moving operation can be done first
      else if (
        this.currentLocation.spaceshipCanBeRemoved(this) &&
        newLocation.spaceshipCanBeAdded(this)
      ) {
        this.currentLocation.removeOutgoingSpaceship(this);
        newLocation.addIncomingSpaceship(this);
        this.currentLocation = newLocation;
      } else {
        throw "Capacity of new location has been reached";
      }
    } else {
      throw "newLocation is either null or undefined";
    }
  }
}

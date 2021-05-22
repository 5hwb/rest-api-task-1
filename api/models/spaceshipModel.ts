'use strict';

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
  Operational = 3
};

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
  id: number;
  name: string;
  model: string;
  status: Status;
  //currentLocation: Location; // TODO: find out how to add!

  /**
   * Create a new Spaceship instance.
   * @param id Spaceship ID
   * @param name Name of spaceship
   * @param model Model of spaceship
   */
  constructor(id: number, name: string, model: string/*, location: Location*/) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.status = Status.Maintenance;
    //this.currentLocation = location;
  }

  /**
   * Convert the Spaceship instance into its string representation.
   * @returns String representation
   */
  toString(): string {
    return "id: " + this.id + ", name: " + this.name + ", model: " + this.model + ", status: " + this.status;
  }
}
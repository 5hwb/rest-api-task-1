'use strict';

/**
 * Models relating to spaceships
 */

/**
 * Indicates the current status of the Spaceship.
 */
export enum Status { Decommissioned, Maintenance, Operational };

/**
 * Spaceship data model
 */
export class Spaceship {
  id: number;
  name: string;
  model: string;
  status: Status;

  /**
   * Create a new Spaceship instance.
   * @param id Spaceship ID
   * @param name Name of spaceship
   * @param model Model of spaceship
   */
  constructor(id: number, name: string, model: string) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.status = Status.Maintenance;
  }

  /**
   * Convert the Spaceship instance into its string representation.
   * @returns String representation
   */
  toString(): string {
    return "id: " + this.id + ", name: " + this.name + ", model: " + this.model + ", status: " + this.status;
  }
}
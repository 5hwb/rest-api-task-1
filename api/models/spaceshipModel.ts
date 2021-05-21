'use strict';

/**
 * Models for the spaceships.
 */

export enum Status { Decommissioned, Maintenance, Operational };

export class Spaceship {
  id: number;
  name: string;
  model: string;
  status: Status;

  constructor(id: number, name: string, model: string) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.status = Status.Maintenance;
  }

  toString(): string {
    return "id: " + this.id + ", name: " + this.name + ", model: " + this.model + ", status: " + this.status;
  }
}
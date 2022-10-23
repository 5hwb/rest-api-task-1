"use strict";

import SpaceshipController from "../controllers/spaceshipController";
import MockDatabase from "../databases/MockDatabase";

/**
 * Set up the URL routes relating to spaceships.
 * @param app Express instance
 */
export default function spaceshipRoutes(
  app: any,
  spaceshipDatabase: MockDatabase,
  locationDatabase: MockDatabase
) {
  // Set up controller
  let spaceshipController: SpaceshipController = new SpaceshipController(
    spaceshipDatabase,
    locationDatabase
  );

  app.route("/").get(spaceshipController.defaultUrlAction);

  app.route("/spaceships").get(spaceshipController.listSpaceships);

  app.route("/spaceships/create").put(spaceshipController.createSpaceship);

  app.route("/spaceships/:spaceshipID").get(spaceshipController.readSpaceship);

  app
    .route("/spaceships/update/:spaceshipID")
    .post(spaceshipController.updateSpaceship);

  app
    .route("/spaceships/move/:spaceshipID/to-location/:newLocationID")
    .post(spaceshipController.moveSpaceship);

  app
    .route("/spaceships/delete/:spaceshipID")
    .delete(spaceshipController.deleteSpaceship);
}

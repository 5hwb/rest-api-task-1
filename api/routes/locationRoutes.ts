"use strict";

import LocationController from "../controllers/locationController";
import MockDatabase from "../databases/MockDatabase";

/**
 * Set up the URL routes relating to locations.
 * @param app Express instance
 */
export default function locationRoutes(
  app: any,
  locationDatabase: MockDatabase
) {
  // Set up controller
  let locationController: LocationController = new LocationController(
    locationDatabase
  );

  app.route("/locations").get(locationController.listLocations);

  app.route("/locations/create").put(locationController.createLocation);

  app.route("/locations/:locationID").get(locationController.readLocation);

  app
    .route("/locations/delete/:locationID")
    .delete(locationController.deleteLocation);
}

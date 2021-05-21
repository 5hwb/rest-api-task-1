'use strict';

import SpaceshipController from '../controllers/spaceshipController';

/**
 * Set up the URL routes relating to spaceships.
 * @param app Express instance
 */
export default function spaceshipRoutes(app: any) {

  // Set up controller
  let spaceshipController: SpaceshipController = new SpaceshipController();

  app.route('/')
    .get(spaceshipController.defaultUrlAction);

  app.route('/spaceships')
    .get(spaceshipController.listSpaceships);

  app.route('/spaceships/create')
    .put(spaceshipController.createSpaceship);

  app.route('/spaceships/:spaceshipID')
    .get(spaceshipController.readSpaceship);

  app.route('/spaceships/update/:spaceshipID')
    .post(spaceshipController.updateSpaceship);

  app.route('/spaceships/delete/:spaceshipID')
    .delete(spaceshipController.deleteSpaceship);

};
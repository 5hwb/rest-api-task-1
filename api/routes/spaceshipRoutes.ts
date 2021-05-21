'use strict';
module.exports = function(app) {
  var spaceshipController = require('../controllers/spaceshipController');

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
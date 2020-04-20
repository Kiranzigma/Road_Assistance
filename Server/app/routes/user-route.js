'use strict';
const jwtAuth = require('../auth');
const userController = require('../controllers/user-controller');
const userrequestController = require('../controllers/user-request-controller');

module.exports = (app) => {

    // route the get and post method to the controller

    app.route('/user')
        .post(userController.register);

    app.route('/vendor')
        .get(userrequestController.list)
        .post(userrequestController.save);

  app.route('/vendor')
  .post(userrequestController.save);
  
  app.route('/vendor/:id')
  .get(userrequestController.list)
  .put(userrequestController.update);

    app.route('/user/confirmation')
        .post(userController.confirmationPost);
    app.route('/user/resendConfirmation')
        .post(userController.resendTokenPost);
    // route the get, put, delete method to the controller

    app.route('/user/:id')
        .post(userController.authenticate)
        .put(jwtAuth, userController.updateUser)
        .get(userController.getUser);

    app.route('/users/:type')
        .get(userController.getAllUsers);

};
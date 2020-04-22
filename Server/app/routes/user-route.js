'use strict';
const jwtAuth = require('../auth');
const userController = require('../controllers/user-controller');
const userrequestController = require('../controllers/user-request-controller');

module.exports = (app) => {

    // route the get and post method to the controller

    app.route('/users')
        .post(userController.register);

    app.route('/users/:id')
        .get(userController.getUser)
        .post(userController.authenticate)
        .put(jwtAuth, userController.updateUser);

    app.route('/vendors/:type')
        .get(userController.getAllUsers);

    app.route('/userrequests/:id/:type')
        .get(userrequestController.list);
    app.route('/userrequests')
        .post(userrequestController.save);
    app.route('/userrequests/:id')
        .put(userrequestController.update);

    app.route('/registration')
        .post(userController.confirmationPost);
    app.route('/reregistration')
        .post(userController.resendTokenPost);

};
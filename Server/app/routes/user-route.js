'use strict';
const jwtAuth = require('../auth');
const userController = require('../controllers/user-controller');
const userrequestController = require('../controllers/user-request-controller');

module.exports = (app) => {

<<<<<<< Updated upstream
    // route the get and post method to the controller

    app.route('/users')
        .post(userController.register);

=======
 
    //for users register
    app.route('/users')
        .post(userController.register);

    //for users based on id
>>>>>>> Stashed changes
    app.route('/users/:id')
        .get(userController.getUser)
        .post(userController.authenticate)
        .put(jwtAuth, userController.updateUser);

<<<<<<< Updated upstream
    app.route('/vendors/:type')
        .get(jwtAuth, userController.getAllUsers);

=======
    // for vendors
    app.route('/vendors/:type')
        .get(jwtAuth, userController.getAllUsers);

    // for user requests based on id and type
>>>>>>> Stashed changes
    app.route('/userrequests/:id/:type')
        .get(jwtAuth, userrequestController.list);
    app.route('/userrequests')
        .post(jwtAuth, userrequestController.save);
    app.route('/userrequests/:id')
        .put(jwtAuth, userrequestController.update);

<<<<<<< Updated upstream
=======
    //for registration 
>>>>>>> Stashed changes
    app.route('/registration')
        .post(userController.confirmationPost);
    app.route('/reregistration')
        .post(userController.resendTokenPost);

};
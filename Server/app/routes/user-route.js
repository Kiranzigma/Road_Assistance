'use strict';
const jwtAuth = require('../auth');
const userController = require('../controllers/user-controller');

module.exports = (app) => {

    // route the get and post method to the controller
    app.route('/user')
        .post(userController.register)
        // route the get, put, delete method to the controller
    app.route('/user/:id')
        .post(userController.authenticate);
    app.route('/user/:id')
        .put(jwtAuth, userController.updateUser);

};
'use strict';

const userController = require('../controllers/user-controller');

module.exports = (app) => {

    // route the get and post method to the controller
    // app.route('/user')
    //     .get(user.controller.authenticate)
    //  .post(rsaController.save);

    // route the get, put, delete method to the controller
    app.route('/user/:id/:pwd')
        .get(userController.authenticate);
};
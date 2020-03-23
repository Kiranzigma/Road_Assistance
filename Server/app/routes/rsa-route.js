'use strict';

const rsaController = require('../controllers/rsa-controller');

module.exports = (app) => {

    // route the get and post method to the controller
    app.route('/rsa')
             .get(rsaController.list)
           //  .post(rsaController.save);
             
    // route the get, put, delete method to the controller
    // app.route('/todo/:id')
    //         .get(rsaController.get)
    //         .put(rsaController.update)
    //         .delete(rsaController.delete);
};
'use strict';
const userService = require('../services/user.service');
const nJwt = require('njwt');
const config = require('../config');

// method to retrieve the values from the resource
// @params - req, resp
exports.authenticate = (request, response) => {
    const userId = request.params.id;
    const pwd = request.params.pwd;
    const promise = userService.auth(userId);
    // check for pwd match 

    var jwt = nJwt.create({ id: userId }, config.secret);
    jwt.setExpiration(new Date().getTime() + (24 * 60 * 60 * 1000));

    const result = (authSuccess) => {
        //set response to 200
        response.status(200).send({ auth: true, token: jwt.compact() });
        // set the json value to the todo object
        response.json(authSuccess);
    };
    promise.then(result)
        .catch(renderErrorResponse(response));
};

// method to handle the error response
// @params - resp
let renderErrorResponse = (response) => {
    const errorCallBack = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallBack;
};
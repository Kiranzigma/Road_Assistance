'use strict';

const rsaService = require('./../services/rsa-service');

// method to retrieve the values from the resource
// @params - req, resp
exports.list = (request, response) => {
const promise = rsaService.search({});
const result = (rsa) => {
    //set response to 200
    response.status(200);
    // set the json value to the todo object
    response.json(rsa);
};
    promise.then(result)
    .catch(renderErrorResponse(response));
};

// method to handle the error response
// @params - resp
let renderErrorResponse = (response) => {
    const errorCallBack = (error) => {
        if(error){
            response.status(500);
            response.json({
                message : error.message
            });
        }
    };
    return errorCallBack;
    
};
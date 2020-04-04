'use strict';
const userService = require('../services/user.service');
const nJwt = require('njwt');
const config = require('../config');
const mongoose = require('mongoose');
const usermodel = mongoose.model('UserSchema');
let CryptoJS = require("crypto-js");

// method to retrieve the values from the resource
// @params - req, resp
exports.authenticate = (request, response) => {
    const userId = request.params.id;
    const userContent = Object.assign({}, request.body);
    const usermodels = new usermodel(userContent);
    const promise = userService.auth(userId);
    // check for pwd match 
    // https://developer.okta.com/blog/2019/05/16/angular-authentication-jwt
    const result = (authSuccess) => {
        //set response to 200
        response.status(200);
        let userPwd = CryptoJS.AES.decrypt(authSuccess.userPassword.toString(), '123456$#@$^@1ERF');
        let pwd = CryptoJS.AES.decrypt(usermodels.userPassword.toString(), '123456$#@$^@1ERF')
        if (pwd.toString(CryptoJS.enc.Utf8) == userPwd.toString(CryptoJS.enc.Utf8)) {
            var jwt = nJwt.create({ id: userId }, config.secret);
            jwt.setExpiration(new Date().getTime() + (24 * 60 * 60 * 1000));
            response.json({ auth: true, token: jwt.compact(), user: authSuccess });
        } else {
            response.json({ auth: false, message: "Invalid User" });
        }
    };
    promise.then(result)
        .catch(renderErrorResponse(response));
};

exports.register = (request, response) => {
    const userToReg = Object.assign({}, request.body);
    const result = (userReg) => {
        response.status(201);
        response.json(userReg);
    };
    const promise = userService.save(userToReg);
    promise.then(result).catch(renderErrorResponse(response));
};

exports.updateUser = (request, response) => {
    const userId = request.params.id;
    const user = Object.assign({}, request.body);
    console.log(userId)

    // get the body fRom the req
    user.id = userId;
    const result = (todo) => {
        response.status(200);
        response.json(todo);
    };
    const promise = userService.update(user);
    promise.then(result).catch(renderErrorResponse(response));
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
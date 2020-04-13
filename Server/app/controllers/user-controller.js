'use strict';
const userService = require('../services/user.service');
const nJwt = require('njwt');
const config = require('../config');
const mongoose = require('mongoose');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const usermodel = mongoose.model('UserSchema');
const userreqmodel = mongoose.model('UserRequestSchema');
let CryptoJS = require("crypto-js");
const tokenmodel = mongoose.model('TokenSchema');
const path = require('path');
const fs = require('fs');

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
        if (pwd.toString(CryptoJS.enc.Utf8) == userPwd.toString(CryptoJS.enc.Utf8)&&authSuccess.isVerified) {
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

exports.register = (req, res) => { 
    const userToReg = Object.assign({}, req.body); 
    const newuser = new usermodel(userToReg);
    newuser.userPassword = CryptoJS.AES.encrypt(newuser.userPassword.toString(), '123456$#@$^@1ERF');

    const result = (register) => {
        console.log(register);
        res.json(register);
    };

    const promise = userService.save(newuser);
    promise.then(result)
        .catch(renderErrorResponse(res));
};

exports.confirmationPost = (req, res) => {
    const verificationCode = req.body.verificationCode;
    const userEmail = req.body.userEmail;

    const result = (confirmation) => {
        console.log(confirmation);
        res.json(confirmation);
    };

    const promise = userService.confirmToken(verificationCode,userEmail);
    promise.then(result)
        .catch(renderErrorResponse(res));
};

exports.resendTokenPost = function (req, res) {
    const userEmail = req.body.userEmail;

    const result = (resend) => {
        console.log(resend);
        res.json(resend);
    };

    const promise = userService.resendToken(userEmail);
    promise.then(result)
        .catch(renderErrorResponse(res));

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

exports.getUser = (request, response) => {
    const userid = request.params.id;
    const result = (user) => {
        response.status(200);
        response.json(user);
    };
    const promise = userService.get(userid);
    promise.then(result)
    .catch(renderErrorResponse(response));
};

// method to handle the error response
// @params - resp
let renderErrorResponse = (response) => {
    const errorCallBack = (error) => {
        console.log(error);
        if (error) {
            if(error.message.includes("unable")||error.message.includes("already")){
                response.status(400);
            } 
            else
            { 
                response.status(500);
            }
            response.json({
                msg: error.message
            });
        }
    };
    return errorCallBack;
};
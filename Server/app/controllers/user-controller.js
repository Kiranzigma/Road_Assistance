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
    newuser.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }

        // Create a verification token for this user
        const tokenContent = Object.assign({}, { _userId: newuser._id, token: crypto.randomBytes(16).toString('hex') });
        const token = new tokenmodel(tokenContent);

        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            //Send the email    
            const transporter = nodemailer.createTransport({
                service: 'Sendgrid',
                auth: {
                  user: 'Pullaingo',
                  pass: 'password-2' // naturally, replace both with your real credentials or an application-specific password
                }
              });
            var mailOptions = { 
                from: 'roadassistance@roadassistancepullaingo.com', 
                to: newuser.userEmail, 
                subject: 'Account Verification Token For Road Assistance', 
                text: 'Hello,\n\n' + 'Please verify your account by entering the code ' + token.token + ' on the link: \nhttp:\/\/' + 'localhost:4200' + '\/verification' + '\n'

            };

            transporter.sendMail(mailOptions, function (err,info) {
                if (err) {  
                    console.log(err);
                    return res.status(500).send({ msg: err.message });
                }
                else{
                    //console.log(info.response);
                    res.json({info});            
                }
            });
        });
    });
};

exports.confirmationPost = (req, res) => {
    // Find a matching token
    const verificationCode = req.body.verificationCode;
    console.log(verificationCode);
    tokenmodel.findOne({ token: verificationCode }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        usermodel.findOne({ _id: token._userId, userEmail: req.body.userEmail }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send({msg:"The account has been verified. Please log in."});

            });
        });
    });
};

exports.resendTokenPost = function (req, res, next) {
 
    usermodel.findOne({ userEmail: req.body.userEmail }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        const tokenContent = Object.assign({}, { _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        const token = new tokenmodel(tokenContent);

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            //Send the email    
            const transporter = nodemailer.createTransport({
                service: 'Sendgrid',
                auth: {
                  user: 'Pullaingo',
                  pass: 'password-2' // naturally, replace both with your real credentials or an application-specific password
                }
              });
            var mailOptions = { 
                from: 'roadassistance@roadassistancepullaingo.com', 
                to: user.userEmail, 
                subject: 'Account Verification Token For Road Assistance', 
                text: 'Hello,\n\n' + 'Please verify your account by entering the code ' + token.token + ' on the link: \nhttp:\/\/' + 'localhost:4200' + '\/verification' + '\n'

            };

            transporter.sendMail(mailOptions, function (err,info) {
                if (err) {  
                    console.log(err);
                    return res.status(500).send({ msg: err.message });
                }
                else{
                    //console.log(info.response);
                    res.json({info});            
                }
            });
        });
 
    });
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
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallBack;
};
'use strict';
const mongoose = require('mongoose');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const usermodel = mongoose.model('UserSchema');
const tokenmodel = mongoose.model('TokenSchema');

// method to search a value in the database
exports.auth = (userId) => {
    const promise = usermodel.findOne({ userEmail: userId }).exec();
    return promise;
};

exports.save = (user) => {
    
}

exports.update = (user) => {
    const promise = usermodel.findByIdAndUpdate({
        _id: user.id
    }, user, { new: true }).exec();
    return promise;
}


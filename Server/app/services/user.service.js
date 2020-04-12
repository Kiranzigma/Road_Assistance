'use strict';
const mongoose = require('mongoose');
const usermodel = mongoose.model('UserSchema');
const userreq = mongoose.model('UserRequestSchema');

// method to search a value in the database
exports.auth = (userId) => {
    const promise = usermodel.findOne({ userEmail: userId }).exec();
    return promise;
};

exports.save = (user) => {
    
}

exports.get = (user) => {
    const getpromise = usermodel.findById(user).exec();
    return getpromise;
};

exports.update = (user) => {
    const promise = usermodel.findByIdAndUpdate({
        _id: user.id
    }, user, { new: true }).exec();
    return promise;
}


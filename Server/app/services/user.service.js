'use strict';
const mongoose = require('mongoose');
const usermodel = mongoose.model('UserSchema');

// method to search a value in the database
exports.auth = (userId) => {
    const promise = usermodel.findOne({ userEmail: userId }).exec();
    return promise;
};

exports.save = (user) => {
    const newuser = new usermodel(user);
    return newuser.save();
}

exports.update = (user) => {
    const promise = usermodel.findByIdAndUpdate({
        _id: user.id
    }, user, { new: true }).exec();
    return promise;
}
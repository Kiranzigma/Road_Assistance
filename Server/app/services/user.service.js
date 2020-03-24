'use strict';
const mongoose = require('mongoose');
const rsamodel = mongoose.model('UserSchema');

// method to search a value in the database
exports.auth = (userId) => {
    const promise = rsamodel.find({ userEmail: userId }).exec();
    return promise;
};
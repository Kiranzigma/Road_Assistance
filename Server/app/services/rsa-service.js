'use strict';

const mongoose = require('mongoose');
const rsamodel = mongoose.model('rsa');

// method to search a value in the database
exports.search = (params) => {
    const promise = rsamodel.find(params).exec();
    return promise;
};


'use strict';
const mongoose = require('mongoose');
const userreq = mongoose.model('UserRequestSchema');

exports.search = (user) => {
    const promise = userreq.find(user).exec();
    return promise;
};

exports.save = (user) => {
    const newuser = new userreq(user);
    // get the current utc datetime
    let currentdate = new Date();
    // sets the createdDate
    newuser.set("created_Date", currentdate.toLocaleString());
    return newuser.save();
};

exports.update = (updatereq) => {
    const promise = userreq.findByIdAndUpdate({
        _id: updatedtoDo.id
    }, updatereq, { new: true }).exec();
    return promise;
};
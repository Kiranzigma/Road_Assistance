'use strict';
const mongoose = require('mongoose');
const userreq = mongoose.model('UserRequestSchema');

<<<<<<< Updated upstream
=======
// method to search a user in the database
>>>>>>> Stashed changes
exports.search = (user,type) => {
    if(type == "user"){
        const promise = userreq.find({user_id:user}).exec();
        return promise;
    }else if (type =="vendor"){
        const promise = userreq.find({vendor_id:user}).exec();
        return promise;
    }
    
};

<<<<<<< Updated upstream
=======
// method to register a value in the database
>>>>>>> Stashed changes
exports.save = (user) => {
    const newuser = new userreq(user);
    // get the current utc datetime
    let currentdate = new Date();
    // sets the createdDate
    newuser.set("created_Date", currentdate.toLocaleString());
    return newuser.save();
};

<<<<<<< Updated upstream
=======
// method to update a value in the database
>>>>>>> Stashed changes
exports.update = (updatereq) => {
    const promise = userreq.findByIdAndUpdate({
        _id: updatereq.id
    }, updatereq, { new: true }).exec();
    return promise;
};
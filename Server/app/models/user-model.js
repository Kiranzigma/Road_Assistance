'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for rsa objects
 */

let userSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

// Duplicate the id field as mangoose returns _id field instead of id

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual functions are serialised 

userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('UserSchema', userSchema);
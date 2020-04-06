'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for user objects
 */

let userSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    isVerified: {
         type: Boolean, 
         default: false 
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    userType: {
        type: String
    }
}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual functions are serialised 

userSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('UserSchema', userSchema);


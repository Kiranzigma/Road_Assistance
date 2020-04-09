'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for rsa objects
 */

let userRequestSchema = new Schema({
    user_id : {
        type : String,
        required : true
    },
    message : {
        type : String
    },

    description : {
       type : String,
       required : true
    },

    created_Date : {
       type : Date
    },

    state : {
      type : String,
      required : true
    },

    vin : {
      type : Number,
      required : true
    },

    register_no : {
        type : Number,
        required : true
    },

    image : {
      type : []
    },

    latitude : {
        type : Number,
        required : true
    },

    longitude : {
        type : Number,
        required : true
    }
}, {
    versionKey: false
});

// Duplicate the id field as mangoose returns _id field instead of id

userRequestSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual functions are serialised 

userRequestSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('UserRequestSchema', userRequestSchema);
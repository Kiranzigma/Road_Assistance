'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for rsa objects
 */

 let rsaSchema = new Schema({

     versionKey : false
 });

 // Duplicate the id field as mangoose returns _id field instead of id

 rsaSchema.virtual('id').get(function(){
     return this._id.toHexString();
 });

 // Ensure virtual functions are serialised 

 rsaSchema.set('toJSON' , {
     virtuals:true
 });

 module.exports = mongoose.model('rsa', rsaSchema);

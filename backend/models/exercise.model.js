//This file defines a mongoose schema for exercise
//dependency variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    //schema fields and their properties as an array
    username: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
},//close the schema bracket
{ //additional parameter timestamps created / modified
    timestamps: true,

}); 
//create the model User in the MongoDB defined from UserSchema, 
//also store it as a variable
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

//dependency variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //username field and it's properties as an array
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //trim whitespace
        minlength: 3
    },
},//close the schema bracket
{ //additional parameter timestamps created / modified
    timestamps: true,

}); 
//create the model User in the MongoDB defined from UserSchema, 
//also store it as a variable
const User = mongoose.model('User', userSchema);

module.exports = User;

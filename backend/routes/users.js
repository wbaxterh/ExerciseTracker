const router = require('express').Router();
let User = require('../models/user.model');

//endpoint handling http GET Requests :) this goes to /users
//GET function request and response to fetch users @ /users
router.route('/').get((req, res) =>{

    //interesting syntax here, chaining functions
    //if get users then do json response, if not then error response

User.find() //mongoose method get all users
.then(users => res.json(users)) //find returns a promise, return in json
.catch(err => res.status(400).json('Error:' + err)); //end function chain

}); // end GET funciton

//Okay now this is post requests to /add endpoint to add a new user
router.route('/add').post((req, res) => {

//username comes in the request body
const username = req.body.username; 

//create a new instance of user model based on the inputted data
const newUser = new User({username}); 

newUser.save()  //mongoose method to save data to the DB
.then(() => res.json("new user added")) //return the promise 
.catch(err => res.status(400).json('Error' + err));

});
module.exports = router; //do this with every router -> export it
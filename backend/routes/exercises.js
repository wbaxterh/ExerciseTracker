const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//endpoint handling http GET Requests :) this goes to /users

router.route('/').get((req, res) =>{

Exercise.find() //mongoose method get all exercises

//find returns a promise(exercises), return in json as defined variable exercises
.then(exercises => res.json(exercises)) 
.catch(err => res.status(400).json('Error:' + err)); //catch error

}); // end GET funciton

//Okay now this is post requests to /add endpoint to add a new user
router.route('/add').post((req, res) => {

//username comes in the request body
const username = req.body.username; 
const description = req.body.description; 
const duration = Number(req.body.duration); 
const date = Date.parse(req.body.date); 

//create a new instance of user model based on the inputted data
const newExercise = new Exercise({
    username,
    description,
    duration,
    date
}); 

newExercise.save()  //mongoose method to save data to the DB
.then(() => res.json("new exercise added")) //return the promise 
.catch(err => res.status(400).json('Error' + err));

});
//return information by exercise ID
router.route('/:id').get((req, res) =>{
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});
//delete the record by ID
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});
//update the record by ID find it then save it
router.route('/update/:id').post((req, res) => {
Exercise.findById(req.params.id)
.then(exercise => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    exercise.save()
    .then(() => res.json("Exercise Updated"))
    .catch(err => res.status(400).json("Error: " + err))
})
.catch(err => res.status(400).json("Error: " + err))
})

module.exports = router; //do this with every router -> export it
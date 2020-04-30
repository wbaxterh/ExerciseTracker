//dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

//middle-ware

//allow cross origin reference 
app.use(cors());
//parse json
app.use(express.json());

//uri to connect to MongoDB
const uri = process.env.ATLAS_URI;

//try to connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true  
}).catch(err =>{
    console.log(err);    
});
//connection variable
const connection = mongoose.connection;
//once or if - the connection is open, do something
connection.once('open', () => {
console.log("MongoDB connected successfully");
});

//require the CRUD files aka routes and use them
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// these are endpoints for the URL in the browser
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//listen on port, do something
app.listen(port, () => {
console.log(`server is running on port : ${port}`);
});
const express = require('express');//import express
const mongoose = require('mongoose');
const app = express(); // execute package
const bodyParser = require('body-parser');

require('dotenv/config');

//middleware
//everytime we hit any request body parser runs
app.use(bodyParser.json()); // parses the data and its returned in json format

//import routes
const postsRoute = require('./routes/posts');

//everytime /posts is hit postsRoute is used/run
app.use('/posts',postsRoute);



//mongodb+srv://user1:<password>@cluster0.kgvn6.mongodb.net/<dbname>?retryWrites=true&w=majority

//Middlewares- functions that are executed when a route is hit/used
// app.use('/posts', () => {
//     console.log('Middleware running');
// });



//use express to create routes
//get - server responds to client
//patch - updating, post - give info to server
app.get('/', (req,res) => {
    res.send('We are on the home page');
});

//connect to db 

mongoose
.connect(process.env.DB_CONNECTION,
        {   
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('MongoDB connected!');
        });

//listening to the server
app.listen(8080);
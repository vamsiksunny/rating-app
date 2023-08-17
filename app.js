const express = require('express');
const bodyParser = require('body-parser'); // to process the request body
const routes = require('express').Router(); // to navigate routes
const courseInfo = require('./routes/courseInfo');

const app = express(); // to start a server
app.use(routes); // to use the routes
app.use(bodyParser.json()); // to tell body parser that I need a json

const PORT = 3000;

app.get('/', (req, res) => {
    return res.status(200).send("Welcome to rating app");
});

app.use('/courses', courseInfo); // telling express that whenever a you recieve a request to '/courses' navigate it to a particular controller

app.listen(PORT, (error) => {
    if (!error) {
        console.log("server started successfully");
    } else {
        console.log("error occured");
    }
});
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

// Start up an instance of app
const express = require('express');
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = '8000';


const server = app.listen(port, () => {
    console.log(`server is runnig at Port:${port}`);
});

// Get Request

app.get('/getdata', (req, res) => {
    res.send(JSON.stringify(projectData));
});

// post request
app.post('/add', (req, res) => {
    console.log(req.body);
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;


    res.send(projectData);
});
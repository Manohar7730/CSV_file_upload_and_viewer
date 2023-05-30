// Import required modules
const express = require('express');
const port = process.env.PORT || 8000;

// Create an Express application
const app = express();

// Set the port number for the server to listen on
const env = require('dotenv').config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine and views directory for rendering views
app.set('view engine', 'ejs');
app.set('views', 'views');

// Serve static files (e.g., CSS, JavaScript, images)
app.use(express.static('public'));


// Import route handlers
const homeRouter = require('./routes/home');

// Route handlers
app.use('/', homeRouter);

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.log(`Error in connecting to server :${err}`);
    }
    console.log(`Server is up and running on port :${port}`);
});

// Connect to the database
const db = require('./config/mongoose');
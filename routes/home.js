const express = require('express');
const router = express.Router(); // Creating a new router object
const homeController = require('../controllers/homeController'); // Importing the homeController module
const CSV = require('../models/csv');// Importing the CSV model

router.get('/',homeController.home);// Handling GET requests to the root URL ('/') using the homeController's home function
router.post('/upload',CSV.uploadedFileMiddleware,homeController.upload);// Handling POST requests to '/upload' URL with the uploadedFileMiddleware and the homeController's upload function
router.get('/delete/:id',homeController.delete);// Handling GET requests to '/delete/:id' URL using the homeController's delete function
router.get('/render/:id',homeController.render);// Handling GET requests to '/render/:id' URL using the homeController's render function

module.exports = router;// Exporting the router module
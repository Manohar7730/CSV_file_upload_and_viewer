const multer = require('multer');// Importing the multer library for file uploading
const mongoose = require('mongoose');// Importing the mongoose library for database operations
const path = require('path');// Importing the path module for file path manipulation

const FILE_PATH = path.join(__dirname, '..', 'uploads');// Define the file path for storing uploaded files

const csvSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true
    }
}, { timestamps: true });// Define the schema for the CSV file model with two fields: file_name and original_name

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, FILE_PATH)// Set the destination directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.csv')// Generate a unique filename for the uploaded CSV file
    }
})

const fileFilter = function (req, file, cb) {
    if (file.mimetype !== 'text/csv') {
        cb(new Error('Invalid file type. Only CSV files are allowed.'));// Check if the uploaded file is of CSV type
    } else {
        cb(null, true);
    }
};

const uploadedFileMiddleware = multer({
    storage: storage,
    fileFilter: fileFilter,
}).single('file');// Define the middleware for handling file uploads and filtering only CSV files

csvSchema.statics.uploadedFileMiddleware = uploadedFileMiddleware;// Assign the uploadedFileMiddleware to the statics of the CSV model
csvSchema.statics.filepath = FILE_PATH;// Assign the file path to the statics of the CSV model

const CSV = mongoose.model('csv', csvSchema);// Create the CSV model using the mongoose schema

module.exports = CSV;// Export the CSV model
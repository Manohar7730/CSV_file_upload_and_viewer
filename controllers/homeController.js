const CSV = require('../models/csv');// Import the CSV model for database operations
const fs = require('fs');// Import the fs module for file system operations
const path = require('path');// Import the path module for file path manipulation
const csv = require('csv-parser');// Import the csv-parser module for parsing CSV files

// Controller function for handling the home page
module.exports.home = async (req, res) => {
    try {
        const csvFiles = await CSV.find({}).sort({ _id: -1 });// Retrieve all CSV files from the database and sort them by descending order of ID
        return res.render('home', {
            title: 'Home Page',
            csvFiles: csvFiles,
            data: []
        });// Render the home page view with the retrieved CSV files
    } catch (err) {
        return res.status(500).send('error in retrieving csv files');
    }

}

// Controller function for handling file upload
module.exports.upload = async (req, res) => {
    try {
        if (req.file) {
            if (req.file.mimetype !== 'text/csv') {
                return res.status(400).send('Only CSV type files are allowed to upload');// Check if the uploaded file is of CSV type
            }
            const csv = new CSV({
                file_name: req.file.filename,
                original_name: req.file.originalname
            })// Create a new CSV document with the uploaded file details

            await csv.save();// Save the CSV document to the database
            return res.redirect('/');// Redirect to the home page after successful upload
        } else {
            return res.redirect('/');// Redirect to the home page if no file was uploaded
        }
    } catch (err) {
        return res.status(500).send('error in upload the csv files')
    }
}

// Controller function for handling file deletion
module.exports.delete = async (req, res) => {
    try {
        const fieldId = req.params.id;
        const deletedCSV = await CSV.findOneAndDelete({ _id: fieldId });// Find and delete the CSV file from the database
        if (!deletedCSV) {
            return res.redirect('/');// Redirect to the home page if the file was not found
        }
        const filepath = path.join(CSV.filepath, deletedCSV.file_name);// Construct the file path for the deleted file
        await fs.promises.unlink(filepath);// Delete the file from the file system

        res.redirect('/');// Redirect to the home page after successful deletion
    } catch (err) {
        return res.status(500).send('Error while deleting the file')
    }
}

// Controller function for rendering the CSV file
module.exports.render = async (req, res) => {
    const fieldId = req.params.id;
    const currentPage = parseInt(req.query.page) || 1;// Get the current page number from the query parameters
    try {
        const csvFile = await CSV.findById(fieldId);// Find the CSV file by ID in the database
        if (!csvFile) {
            return res.status(400).send('File not found');// Return an error if the file was not found
        }
        const filePath = path.join(CSV.filepath, csvFile.file_name);// Construct the file path for the CSV file

        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())// Parse the CSV file using csv-parser
            .on('data', (data) => results.push(data))// Collect the parsed data into an array
            .on('end', () => {
                const itemsPerPage = 100;// Define the number of items to display per page
                const startIdx = (currentPage - 1) * itemsPerPage;// Calculate the starting index of the data for the current page
                const endIdx = startIdx + itemsPerPage;// Calculate the ending index of the data for the current page
                const paginatedData = results.slice(startIdx, endIdx);// Get the data for the current page

                const totalPages = Math.ceil(results.length / itemsPerPage);// Calculate the total number of pages
                const maxPageNumbers = 10;// Define the maximum number of page numbers to display
                let startPage, endPage;
                if (totalPages <= maxPageNumbers) {
                    startPage = 1;
                    endPage = totalPages;
                } else {
                    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
                    if (currentPage <= halfMaxPageNumbers) {
                        startPage = 1;
                        endPage = maxPageNumbers;
                    } else if (currentPage + halfMaxPageNumbers >= totalPages) {
                        startPage = totalPages - maxPageNumbers + 1;
                        endPage = totalPages;
                    } else {
                        startPage = currentPage - halfMaxPageNumbers;
                        endPage = currentPage + halfMaxPageNumbers;
                    }
                }
                res.render('file', {
                    title: 'CSV File',
                    file: csvFile,
                    data: paginatedData,
                    currentPage: currentPage,
                    totalPages: totalPages,
                    startPage: startPage,
                    endPage: endPage,
                    maxPageNumbers: maxPageNumbers
                });// Render the file view with the CSV file details and paginated data
            })
            .on('error', (error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } catch (err) {
        return res.status(500).send('Cannot view the file')
    }
}
const CSV = require('../models/csv');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports.home = async (req, res) => {
    try {
        const csvFiles = await CSV.find({}).sort({ _id: -1 });
        return res.render('home', {
            title: 'Home Page',
            csvFiles: csvFiles,
            data: []
        });
    } catch (err) {
        return res.status(500).send('error in retrieving csv files');
    }

}

module.exports.upload = async (req, res) => {
    try {
        if (req.file) {
            if (req.file.mimetype !== 'text/csv') {
                return res.status(400).send('Only CSV type files are allowed to upload');
            }
            const csv = new CSV({
                file_name: req.file.filename,
                original_name: req.file.originalname
            })

            await csv.save();
            return res.redirect('/');
        } else {
            return res.redirect('/');
        }
    } catch (err) {
        return res.status(500).send('error in upload the csv files')
    }
}

module.exports.delete = async (req, res) => {
    try {
        const fieldId = req.params.id;
        const deletedCSV = await CSV.findOneAndDelete({ _id: fieldId });
        if (!deletedCSV) {
            return res.redirect('/');
        }
        const filepath = path.join(CSV.filepath, deletedCSV.file_name);
        await fs.promises.unlink(filepath);

        res.redirect('/');
    } catch (err) {
        return res.status(500).send('Error while deleting the file')
    }
}

module.exports.render = async (req, res) => {
    const fieldId = req.params.id;
    try {
        const csvFile = await CSV.findById(fieldId);
        if (!csvFile) {
            return res.status(400).send('File not found');
        }
        const filePath = path.join(CSV.filepath, csvFile.file_name);

        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                res.render('file', {
                    title: 'CSV File',
                    file: csvFile,
                    data : results
                });
            })
            .on('error', (error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } catch (err) {
        return res.status(500).send('Cannot view the file')
    }
}
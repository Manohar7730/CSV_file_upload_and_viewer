const CSV = require('../models/csv');
const fs = require('fs');
const path = require('path');

module.exports.home = async (req,res)=>{
    try{
        const csvFiles = await CSV.find({}).sort({ _id: -1 });
        return res.render('home',{
            title : 'Home Page',
            csvFiles : csvFiles
        });
    }catch(err){
        return res.status(500).send('error in retrieving csv files');
    }

}

module.exports.upload = async (req,res)=>{
    try{
        if(req.file){
            if(req.file.mimetype !== 'text/csv'){
                return res.status(400).send('Only CSV type files are allowed to upload');
            }
            const csv = new CSV({
                file_name : req.file.filename,
                original_name : req.file.originalname
            })

            await csv.save();
            return res.redirect('/');
        }else{
            return res.redirect('/');
        }
    }catch(err){
        return res.status(500).send('error in upload the csv files')
    }
}
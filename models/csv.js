const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname,'..','uploads');

const csvSchema = new mongoose.Schema({
    file_name:{
        type:String,
        required :true
    },
    original_name:{
        type:String,
        required:true
    }
},{timestamps:true});

const storage = multer.diskStorage({
    destination : function(req,res,cb){
        cb(null,FILE_PATH)
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,file.fieldname + '-' + uniqueSuffix + '.csv')
    }
})

const fileFilter = function(req,file,cb){
    if(file.mimetype !== 'text/csv'){
        cb(new Error('Invalid file type. Only CSV files are allowed.'));
    } else {
    cb(null, true);
    }
};

const uploadedFileMiddleware = multer({
    storage : storage,
    fileFilter : fileFilter,
}).single('file');

csvSchema.statics.uploadedFileMiddleware = uploadedFileMiddleware;
csvSchema.statics.filepath = FILE_PATH;

const CSV = mongoose.model('csv',csvSchema);

module.exports = CSV;
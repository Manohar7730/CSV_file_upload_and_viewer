const express = require('express');
const port = process.env.PORT || 8000;

const env = require('dotenv').config();
const app = express();

const db = require('./config/mongoose');

const homeRouter = require('./routes/home');
app.use('/',homeRouter);

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to server :${err}`);
    }
    console.log(`Server is up and running on port :${port}`);
});
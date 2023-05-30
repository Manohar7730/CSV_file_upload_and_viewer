const mongoose = require('mongoose');

mongoose.connect(process.env.URL,{useNewUrlParser : true , useUnifiedTopology : true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting to database'));

db.once('open',()=>{
    console.log('connected to database');
});

module.exports = db;
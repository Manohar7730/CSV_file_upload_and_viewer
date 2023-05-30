const express = require('express');
const port = process.env.PORT || 8000;

const app = express();

app.get('/',(req,res)=>{
    res.send('Server is running');
})

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in connecting to server :${err}`);
    }
    console.log(`Server is up and running on port :${port}`);
});
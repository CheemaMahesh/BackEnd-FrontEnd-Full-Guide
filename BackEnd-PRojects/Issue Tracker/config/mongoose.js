//import express
const mongoose=require('mongoose');
//connect to the database
mongoose.connect('mongodb://127.0.0.1/issueTracker');
const db=mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));

db.once('open',function(){
  console.log("Connection was Successful on mongoose");
});

//export db
module.exports=db;
// const mongoose=require('mongoose');

const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Codieal_development');
const db=mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));

db.once('open',function(){
  console.log("Connection was Successful on mongoose");
});


module.exports=db;


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/codeial_development');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });


// module.exports = db;
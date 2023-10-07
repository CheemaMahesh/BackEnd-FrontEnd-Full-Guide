//import which are required
const express=require('express');
const port=8000;
const app=express();
const db=require('./config/mongoose');


// app.use(express.urlencoded({}));
app.use(express.urlencoded(
    {extended:false}
));


//static
app.use(express.static('./assets'));


//use ejs
app.set('view engine','ejs');
app.set('views','./views');


//use express routes
app.use('/',require('./routes'));

//app.listen
app.listen(port,function(err){
    if(err){
        console.log("error in listning app:-",err);
        return;
    }

    console.log("Server is up and running on port:--",port);
});
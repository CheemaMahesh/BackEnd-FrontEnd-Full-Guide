//import express
const express=require('express');
const Port=8000;
const db=require('./config/mongoose');

const app=express();


const passport=require('passport')
const passportJWT=require('./config/passport-jwt-strategy');

app.use(express.urlencoded(
    {
       // extended:true
   }
));


app.use('/',require('./routes'));

app.listen(Port,function(err){
    if(err){console.log(err);return}
    console.log("server is up and running on port",Port);
    return;
})

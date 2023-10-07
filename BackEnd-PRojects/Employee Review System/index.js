// import express
const express=require('express');
const cookieParser = require('cookie-parser');
const Port=8000;
const app=express();
const db=require('./config/mongoose');

//used for session cookie
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


// const MongoStore=require('connect-mongo')(session);
// const MongoStore = require('connect-mongo');
const MongoStore = require('connect-mongo');





app.use(express.static('./assets'));



app.use(express.urlencoded({ 
    // extended: true 
}));

app.use(cookieParser());



app.set('view engine','ejs');
app.set('views','views');

// app.use(cookieParser());

app.use(session({
    name:'employeeReviewSystem',
    //TODO chage the secreat before Deployment
    secret:'empRS',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/EmployeeReviewSystem',
    autoRemove:'disabled'
})
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));


app.listen(Port,function(err){if(err){console.log("error while starting the server:-",err);return}
console.log("Server is up and running on port:-",Port);
})
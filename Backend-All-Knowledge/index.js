const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port =8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// const session=require('express-session');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const possportJWT=require('./config/passport-jwt-strategy');


const flash=require('connect-flash');
const customMiddleware=require('./config/middleware');

//importing connect-mongo and unline other libraries it requires an argument called(session====>that we have as a variable);
const MongoStore=require('connect-mongo');
// (session);

//body-parser
// const bodyParser = require('body-parser');
app.use(express.urlencoded(
     {
        // extended:true
    }
));



// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }))


app.use(cookieParser());



app.use(express.static('./assets'));

//make the uploaded path available to the borweser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);



//extract styles ans scripts from sub-pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);






//use ejs 
app.set('view engine','ejs');
app.set('views','./views');




//mongo store used to store the session cookie in db
app.use(session({
    name:'Coiedl',
    //TODO change the secret before deployment
    secret:"BLAAha",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    // store:new MongoStore({
    //     mongooseConnection:db,
    //     autoRemove:'disabled'
    // }
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/Codieal_development',
    autoRemove:'disabled'
})

    // ,function(err){
    //     console.log(err||"connect mongodb ok")
    // })

}));


app.use(passport.initialize());
app.use(passport.session());





app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMiddleware.setFlash);



//use express router
app.use('/',require('./routs'));

//use express router(/profile)
// app.use('/profile',require('./routs'));

app.listen(port,function(err){
    if(err){
        // console.log("================Error:",err);
        console.log(`============Error ${err}`)
        return;
    }
    console.log(`Server is up and running on port ${port}`);
})
//bring in dependancies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const expressValidator = require('express-validator')
const flash = require('connect-flash')



//import model
const ctrlUser = require('./models/User');

//Import routes
const postsRoute = require('./routes/posts');
const gardensRoute = require('./routes/gardens');
const userRegistration = require('./routes/User');


//call express, execute
const app = express();
const PORT = process.env.Port || 3000;





/****middleware*****/

//cors
app.use(cors());

/**
 * deprecation warning from this
 */
//parse body into json
app.use(bodyParser.json());

app.use(express.json())

//whenever /posts is hit, use postsRoute
app.use('/posts', postsRoute);

app.use('/gardens', gardensRoute);

app.use('/register', userRegistration);



/******* connect to mongo db ********/
const MongoClient = require('mongodb').MongoClient;

//connection string to db
const uri = "mongodb+srv://alex:NwWxO76KuTLaQfEx@node-rest.wudka.mongodb.net/node-rest?retryWrites=true&w=majority";

//atlas db password -- NwWxO76KuTLaQfEx
//connect cloud mongoose
//second param are the options
mongoose.connect(uri, {

    useNewUrlParser: true,
    useUnifiedTopology: true
    
}).then(() => {
    console.log('mongodb connected...');
});

//error handling
app.use((err, req, res, next) => {
    if(err.name == 'ValidationError') {
        var valErrors = [];
        //return all keys inside the error object, push errors to the array
        Object.keys(err.errors).forEach(key => {
            valErrors.push(err.errors[key].message)
        });
        res.status(422).send(valErrors)
    }
})

app.use(function(req,res,next) {
    var err = new Error('not found');
    err.status = 404;
    next(err);
})

//define 
passport.use(new LocalStrategy(
    function(username, password, done) {
        if(username === "admin" && password === "admin"){
            return done(null, username);
        } else {
            return done("unauthorized access", false);
        }
    }
));


//Authenticate using passport
const auth = () => {
    return (req, res, next) => {
        passport.authenticate('local', (error, user, info) => {
            if(error) res.status(400).json({"statusCode" : 200 ,"message" : error});
            req.login(user, function(error) {
                if (error) return next(error);
                next();
            });
        })(req, res, next);
    }
}

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

app.get('/getData', isLoggedIn, (req, res) => {
    res.json("data")
})

app.post('/authenticate', (req, res) => {
    res.status(200).json({"statusCode" : 200 ,"message" : "hello"});
});



//listen on port 3000
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
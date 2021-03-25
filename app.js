//bring in dependancies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');



//import model
const ctrlUser = require('./models/User');


//call express, execute
const app = express();
const PORT = process.env.Port || 3000;

//Import routes
const postsRoute = require('./routes/posts');
const gardensRoute = require('./routes/gardens');
const userRegistration = require('./routes/User');



/****middleware*****/

//cors
app.use(cors());

/**
 * deprecation warning from this
 */
//parse body into json
app.use(bodyParser.json());

//whenever /posts is hit, use postsRoute
app.use('/posts', postsRoute);

app.use('/gardens', gardensRoute);

app.use('/register', userRegistration);

//error handler
/**
 * Not working properly
 */
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





//listen on port 3000
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
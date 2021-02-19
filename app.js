//bring in dependancies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

//call express, execute
const app = express();
const PORT = process.env.Port || 3000;

//Import routes
const postsRoute = require('./routes/posts');
const gardensRoute = require('./routes/gardens');


/****middleware*****/

//cors
app.use(cors());

//parse body into json
app.use(bodyParser.json());

//whenever /posts is hit, use postsRoute
app.use('/posts', postsRoute);

app.use('/gardens', gardensRoute);





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


//Routes
app.get('/', (req,res) => {
    res.send('We are Home, server listening on port: ' + PORT);
});



//listen on port 3000
app.listen(PORT);

/***
 * file holds gardens routes
 */

const express = require('express');
const router = express.Router();
//import model
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

const emailCheck = require('email-check') ;
//other imports

/** register user **/
router.post('/', async (req,res) => {

    console.log('attempt to add new user');

    //get garden data
    const NewUser = new User({

        fullName: req.body.fullName,
        zone: req.body.zone,
        email: req.body.email,
        password: req.body.password,
    });

    console.log('created new user object on server side')

    console.log('try new way to save')

    NewUser.save(function(err){
        if(err){
             console.log(err);
             return;
        };
    })

    console.log('saved to databse');
    console.log(NewUser);
    console.log('added user success');
    res.json(NewUser);

    //save to database
    /*
    try{
        console.log('inside try block')
        console.log(NewUser);
        
        await NewUser.save()
        
        console.log('saved to databse');
        res.json(savedUser);
        console.log('added user success');
    } catch(err) {
        res.json({message: err});
    }
    */
});

//get users
router.get('/', async (req,res) => {
    try{

        //var to store all garden data
        const users = await User.find();

        //return response
        res.json(users);

    } catch(err) {
        res.json({message: err});
    }
});


//export routes
module.exports = router;

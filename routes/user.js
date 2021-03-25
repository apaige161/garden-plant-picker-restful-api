
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

    //get garden data
    const NewUser = new User({

        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    });

    //save to database
    try{
        const savedUser = await NewUser.save();
        res.json(savedUser);
    } catch(err) {
        res.json({message: err});
    }
});


//export routes
module.exports = router;

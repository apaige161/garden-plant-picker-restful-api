
/***
 * file holds gardens routes
 */

const express = require('express');
const router = express.Router();
//import model
const Garden = require('../models/Garden');

/** get all gardens 
 *  -gardens will only contain a single plant right now 
**/
router.get('/', async (req,res) => {
    try{

        //var to store all garden data
        const gardens = await Garden.find();

        //return response
        res.json(gardens);

    } catch(err) {
        res.json({message: err});
    }
});


/** get specific posts by ID **/
router.get('/:postId', async (req, res) => {
    try{
        //use model and find by ID
        const post = await Garden.findById(req.params.postId);
        //give back the specific post
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
})


/** delete specific posts by ID **/
router.delete('/:postId', async (req, res) => {
    try{
        //use model and remove by ID targeting the _id param
        const removedPost = await Garden.deleteOne({_id: req.params.postId});
        res.json(removedPost);
    } catch(err) {
        res.json({message: err});
    }
})

/** update specific posts by ID **/
router.patch('/:postId', async (req, res) => {
    try{
        //use model and update by ID targeting the _id param
        //the first param of updateOne is to find the object, 
        //second is what to change it to
        const updatedPost = await Garden.updateOne({_id: req.params.postId}, {$set: {plant: req.body.plant}});
        res.json(updatedPost);
    } catch(err) {
        res.json({message: err});
    }
})

/** submit garden **/
router.post('/', async (req,res) => {

    //get garden data
    const garden = new Garden({
        plant: req.body.plant,

    });

    //save to database
    try{
        const savedGarden = await garden.save();
        res.json(savedGarden);
    } catch(err) {
        res.json({message: err});
    }
});

//export routes
module.exports = router;

/***
 * file holds posts routes --sample
 */

const express = require('express');
const router = express.Router();
//import model
const Post = require('../models/Post');

/** get all posts **/
router.get('/', async (req,res) => {
    try{

        //var to store all post data
        const posts = await Post.find();

        //return response
        res.json(posts);

    } catch(err) {
        res.json({message: err});
    }
});


/** get specific posts by ID **/
router.get('/:postId', async (req, res) => {
    try{
        //use model and find by ID
        const post = await Post.findById(req.params.postId);
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
        const removedPost = await Post.deleteOne({_id: req.params.postId});
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
        const updatedPost = await Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.title}});
        res.json(updatedPost);
    } catch(err) {
        res.json({message: err});
    }
})

/** submit post **/
router.post('/', async (req,res) => {

    //get post data
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    //save to database
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }
});

//export routes
module.exports = router;
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Returns/gets all the posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find(); // will return all the posts
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/', async (req,res) => {
    res.send('We are on posts');
});

// router.get('/specific', (req,res) => {
//     res.send('We are on a specific post');
// });

// Submits a post
router.post('/', async (req,res) => {
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    //save to database
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }
    catch(err){
        res.json({message: err});
    }
});
//Return specific post
// localhost:8080/posts/:postId
router.get('/:postId', async (req, res) => {
    // console.log(req.params.postId); // GET
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }
    catch (err){
        res.json({message: err});
    }
});

//Delete a post
router.delete('/:postId', async (req, res) => {
    try{
    const removePost = await Post.remove({ _id: req.params.postId});
    res.json(removePost);
    }
    catch(err){
        res.json({message: err});
    }
});

//Update a post
router.patch('/:postId', async (req,res) => {
    try{
    const updatePost = await Post.updateOne(
        { _id:req.params.postId}, 
        {$set: {title: req.body.title}
    });
    res.json(updatePost);  
    }
    catch(err){
        res.json({message: err});
    }
})

//export router
module.exports = router;
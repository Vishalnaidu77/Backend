const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs/index.js")
const { toFile } = require("@imagekit/nodejs/index.js")
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "insta-clone-post"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })

}

async function getPostController(req, res){
    

    const userId = req.user.id;

    const posts = await postModel.find({
        user: userId
    })

    res.status(200)
    .json({
        message: "Posts fetched successfully",
        posts
    })

}

async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId;

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    res.status(200).json({
        mesage: "Post fetched successfully",
        post
    })
}

async function likedPostController(req, res){
    const username = req.user.username
    const postId = req.params.postid

    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message: "Post not available"
        })
    }

    const likedPost = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Liked post successfully",
        likedPost
    })
}

async function unLikedPostController(req, res){
    const username = req.user.username
    const postId = req.params.postid

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if(!isLiked){
        return res.status(400).json({
            message: "Post didn't liked"
        })
    }

    await likeModel.findOneAndDelete({ _id: isLiked._id})

    res.status(200).json({
        message: "Post unliked"
    })
}

async function getFeedController(req, res){

    const user = req.user
    if(!user){
        return res.status(404).json({
            message: "User not authorized to see feed"
        })
    }

    const posts = await Promise.all((await postModel.find().populate("user").lean()) 
    .map(async(post) => {
        
        const isLiked = await likeModel.findOne({
            user: user.username,
            post: post._id
        })

        post.isLiked = Boolean(isLiked)

        return post
    }))

    res.status(200).json({
        message: "Post fetched successfully.",
        posts
    })
}

async function savePostController(req, res){
    const user = req.user
    const postId = req.params.postId
    
    if(!user){
        return res.status(400).json({
            message: "User not authorized"
        })
    }

    const postExists = await postModel.findOne({ _id: postId })
    console.log(postExists);
    
    if(!postExists){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const postAlreadySaved = await saveModel.findOne({ postId: postId })

    if(postAlreadySaved){
        return res.status(400).json({
            message: "You can't save one post twice."
        })
    }

    const savePost = await saveModel.create({
        user: postExists.user,
        caption: postExists.caption,
        imageUrl: postExists.imageUrl,
        postId: postExists._id
    })

    res.status(200).json({
        message: "Post saved successfully",
        savePost
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likedPostController,
    getFeedController,
    unLikedPostController,
    savePostController
}
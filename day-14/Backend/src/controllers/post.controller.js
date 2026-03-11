const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs/index.js")
const { toFile } = require("@imagekit/nodejs/index.js")
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

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

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likedPostController
}
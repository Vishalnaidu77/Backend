const userModel = require("../models/user.model");
const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    // Check existing user
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "User is already exist." + (isUserAlreadyExist.email === email ? "Email is already exists" : "Username is not available")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfull",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            {username: username},
            {email: email}
        ]
    }).select("password")

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const pass = await bcrypt.compare(password, user.password)

    if(!pass){ 
        return res.status(400).json({
            message: "Invalid Username or Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    if(!user){
        return res.status(404).json({
            message: "User not find, login first"
        })
    }

    res.status(200).json({
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}
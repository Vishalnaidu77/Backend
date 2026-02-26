const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()


// /api/auth/register
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "User already exist with this email."
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user =  await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User regestered",
        user,
        token
    })
})

// /api/auth/protected
authRouter.post("/protected", (req, res) => {

    console.log(req.cookies);

    res.status(201).json({
        message: "This is protected API"
    })
})

// /api/auth/login
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(404).json({
            message: "User not found with this email"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        return res.status(401).json({
            message: "Incorrect Password or email"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User Logged in successfully",
        user
    })
})

module.exports = authRouter;

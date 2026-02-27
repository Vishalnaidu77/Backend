const express = require("express")
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

// /api/auth/register
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "User is already exist with this email"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: "1h"})

    res.cookie("token", token)

    res.status(201).json({
        message: "User register successfully",
        user
    })

})

authRouter.get("/get-me", async (req, res) => {
    const token = req.cookies.token;

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decode.id)
    
    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(404).json({
            message: "Can't find user with this email, kindly register first"
        })
    }

    const checkPass = user.password === crypto.createHash("sha256").update(password).digest("hex")
    if(!checkPass){
        return res.status(400).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in",
        email: user.email,
        name: user.name
    })

})

module.exports = authRouter;
import { userModel } from "../models/user.model.js"
import sendEmail from "../services/mail.service.js"
import jwt from 'jsonwebtoken'

export async function registerController(req, res) {
    const { username, email, password } = req.body

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if(isUserExists){
        return res.status(400).json({
            message: "User is already exist with this username or email.",
            success: false,
            err: "User already exists"
        })
    }

    console.log(isUserExists);

    const user = await userModel.create({ username, email, password })

    const emailVerificationToken = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET )

    const emailResponse = await sendEmail({
        to: email,
        subject: "Welcome to Cerebro AI",
        html: `<h3>Hi ${username},</h3>
                <p>Welcome the the Cerebo AI.</p>
                <p>Please verifi your email by clicking on the link given below</p>
                <a href='http://localhost:8000/api/auth/verify-email?token=${emailVerificationToken}'>Verify Email</a>
                <p>Welcome aboard!</p>
            `
    })

    return res.status(201).json({
        message: "User registered successfully. Verification email sent.",
        success: true,
        user: {
            username: user.username,
            email: user.email,
        }
    })
}

export async function loginController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(404).json({
            message: "User not exist with this email, register first.",
            success: false,
            err: "User not exists"
        })
    }

    const correctPassword = await user.comparePassword(password)
    if(!correctPassword){
        return res.status(401).json({
            message: "Invalid credentials",
            success: false,
            err: "Invalid credentials"
        })
    }

    if(!user.verified){
        return res.status(401).json({
            message: "Email not verified, please verify email first",
            success: false,
            err: "Email not verified."
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '7d'})

    res.cookie('token', token)

    res.status(200).json({
        message: "User logged in successfully",
        success: false,
    })
}

export async function verifyEmail(req, res) {
    const { token } = req.query

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findOne({ email: decoded.email })

    if(!user){
        return res.status(400).json({
            message: 'Invalid Token',
            success: false,
            err: 'User not found'
        })
    }

    user.verified = true

    user.save()
    const html = `
            <h1>Email verified successfull</h1>
            <p>Your email has been verified. You can now login to your account.</p>
            <a href='http://localhost:8000/api/auth/login'>Login</a>
        `
    
    res.send(html)
}

export async function getMeController(req, res) {
    const userId = req.userId

    const user = await userModel.findById(userId)
    console.log(req.userId);

    if(!user){
        return res.status(401).json({
            message: "Unauthorized User",
            success: false
        })
    }

    res.status(200).json({
        message: "Fetch user details successfully.",
        success: true,
        user
    })
}
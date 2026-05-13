import { userModel } from "../models/user.model.js"
import sendEmail from "../services/mail.service.js"

export async function registerController(req, res) {
    const { username, email, password } = req.body

    const isUserExists = await userModel.find({
        $or: [{ username }, { email }]
    })

    if(isUserExists === []){
        return res.status(400).json({
            message: "User is already exist with this username or email.",
            success: false,
            err: "User already exists"
        })
    }

    const user = await userModel.create({ username, email, password })

    const emailResponse = await sendEmail({
        to: email,
        subject: "Welcome to Cerebro AI",
        html: `<h3>Hi ${username},</h3>
                <p>This is a dummy verification email for testing purposes.</p><br>
                <p>Welcome aboard!</p>
            `
    })

    return res.status(201).json({
        message: "User registered successfully. Verification email sent.",
        success: true,
        user
    })
}
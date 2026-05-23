import { generateChatTitle, generateResponse } from "../services/ai.service.js"

export async function sendMessage(req, res) {
    const { message } = req.body

    if(!message){
        return res.status(400).json({
            message: "User input are empty.",
            success: false,
        })
    }

    const response = await generateResponse(message)
    const title = await generateChatTitle(message)

    res.status(200).json({
        message: response,
        title
    })
}
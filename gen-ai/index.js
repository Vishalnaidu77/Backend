import readline from 'readline/promises'
import { ChatMistralAI } from '@langchain/mistralai'
import { HumanMessage, AIMessage, tool, createAgent } from 'langchain'
import * as z from 'zod'
import 'dotenv/config'
import { sendMail } from './email.service.js'

const emailTool = tool(
    sendMail,
    {
        name: "emailTool",
        description: "Use this tool to send an email.",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            subject: z.string().describe("SUbject of the email"),
            html: z.string().describe("HTML content of the email.")
        })
    }
)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatMistralAI({
    model: "mistral-small-latest"
})

const agent = createAgent({
    model,
    tools: [emailTool]
})

const messages = []

while(true){
    const userInput = await rl.question("\x1b[36mYou:\x1b[0m ")

    if(userInput.toLocaleLowerCase() === 'exit' || userInput.toLocaleLowerCase() === 'quit'){
        console.log("\x1b[33mExiting chat...\x1b[0m");
        rl.close()
        break;
    }

    messages.push(new HumanMessage(userInput))

    process.stdout.write("\x1b[90mAI is typing...\x1b[0m\r")

    const res = await agent.invoke({ messages })

    process.stdout.write("\x1b[2K\r");
    messages.push(res.messages[res.messages.length - 1]);
    console.log("\x1b[32mAI:\x1b[0m \n" + res.messages[res.messages.length - 1].content);
}
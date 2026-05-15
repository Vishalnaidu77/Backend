import readline from 'readline/promises'
import { ChatMistralAI } from '@langchain/mistralai'
import { HumanMessage, AIMessage } from 'langchain'
import 'dotenv/config'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatMistralAI({
    model: "mistral-small-latest"
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

    const res = await model.invoke(messages)

    process.stdout.write("\x1b[2K\r");
    messages.push(new AIMessage(res.content))
    console.log("\x1b[32mAI:\x1b[0m \n" + res.content);
}
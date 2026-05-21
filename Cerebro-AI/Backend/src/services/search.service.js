import 'dotenv/config'
import { tavily } from '@tavily/core'

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
})

const res = await tvly.search("When spider man brand new day release ?")
console.log(res.results[0].content);
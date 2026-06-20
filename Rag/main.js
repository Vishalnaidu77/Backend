import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from '@langchain/mistralai'
import { Pinecone } from '@pinecone-database/pinecone'
import 'dotenv/config'

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

const index = pc.index("rag-demo")

const loader = new PDFLoader("./PythonIntegrationPlan.pdf")

// const docs = await loader.load()
// const rawText = docs.map(doc => doc.pageContent).join("\n")

// const splitters = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 0
// })

const embeddingModel = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

// const chunks = await splitters.splitText(rawText)

// const embeds = await Promise.all(chunks.map(async (chunk) => {
//     const embeddings = await embeddingModel.embedQuery(chunk)
//     return {
//         text: chunk,
//         embeddings
//     }
// }))

// const result = await index.upsert({
//     records: embeds.map((embed, id) => ({
//         id: `doc-${id}`,
//         values: embed.embeddings,
//         metadata: {
//             text: embed.text
//         }
//     }))
// })

const query = await embeddingModel.embedQuery("How to ingerate python ?")
const result = await index.query({
    vector: query,
    topK: 2,
    includeMetadata: true
})

console.log(JSON.stringify(result));

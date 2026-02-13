const express = require("express")
const app = express()
const noteModel = require("./models/notes.mode")

app.use(express.json())


// Create Notes
app.post("/notes", async (req, res) => {
    const { title, description, type } = req.body

    const note = await noteModel.create({
        title, description, type
    })

    res.status(201).json({
        message: "Note Created Succcessfully",
        note
    })
})


// Fetch Notes
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Fetch notes successfully",
        notes
    })
})


// Delete Notes
app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id
    
    await noteModel.findByIdAndDelete(id)
    
    res.status(200).json({
        message: "Note deleted successfully",
        id
    })
})


// Update Notes
app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const { description } = req.body 

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully"
    })
})

module.exports = app
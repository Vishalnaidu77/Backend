const express = require("express")
const noteModel = require("./models/notes.model")
const app = express()

app.use(express.json())

// Post method API
app.post("/notes", async (req, res) => {
    const { title, description, type } = req.body

    const note = await noteModel.create({
        title, description, type
    })

    res.status(201).json({
        message: "Note creates successfully",
        note
    })
})

app.get("/notes",  async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

module.exports = app; 
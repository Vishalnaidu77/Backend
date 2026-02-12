const express = require("express")
const noteModel = require("./models/notes.model")
const app = express()

app.use(express.json())

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

module.exports = app; 
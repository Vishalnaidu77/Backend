const express = require("express")
const app = express()

app.use(express.json())

const notes = []

app.get("/", (req, res) => {
    res.send("Jai Shree Krishna")
})

app.post("/notes", (req, res) => {
    notes.push(req.body)
    console.log(notes);
    res.send("Notes created")
})

app.get("/notes", (req, res) => {
    res.send(notes)
})

app.delete("/notes/:index", (req,res) => {
    delete notes[ req.params.index ]
    console.log("Note deleted successfully");
})

app.patch("/notes/:index", (req, res) => {
    notes[ req.params.index ].description = req.body.description;
    res.send("Notes updated successfully")
})
 
module.exports = app

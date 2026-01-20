const express = require("express")
const app = express() // Server ka instance create karna

app.get('/', (req, res) => {
    res.send("Jai Shree Ram")
})

app.get('/about', function(req, res){
    res.send("This is about page")
})

app.get('/product', (req, res) => {
    res.send("Radhe Radhe")
})

app.listen(3000) // Server start karna 
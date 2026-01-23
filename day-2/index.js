const express = require("express")
const app = express() // Server ka instance create karna

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/about', function(req, res){
    res.send("This is about page")
})

app.get('/product', (req, res) => {
    res.send("Product page")
})

app.listen(3000) // Server start karna S
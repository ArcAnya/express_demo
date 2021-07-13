const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // configure express to work with JSON objects
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => { // listening to a get request on the default path
    console.table(req.query) // outputting req.query in nice table
    let greeting = req.query.message || "World" // greeting = the message from the query OR if non existent "World"
    res.send(`<h1>Hello ${greeting}!</h1>`) // note: backticks for dynamic strings
})

app.post('/', (req, res) => {
    console.table(req.body) // showing the body of request in table
    res.send({ message: req.body }) // posting the body as a response
})

app.listen(port, () => console.warn(`Server is running on http://localhost:${port}!`))

module.exports = app // => other scripts can import the app object

require("dotenv").config()
const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()
const Port = process.env.PORT || 8000

app.use(express.json()) // Middleware to parse incoming JSON requests

// Create path for db.json
const DBPath = path.join(__dirname, "db.json")

// Function to read db.json with error handling
function readDb() {
    try {
        if (!fs.existsSync(DBPath)) {
            // If db.json doesn't exist, initialize it with an empty todos array
            fs.mkdir("db.json")
            fs.writeFileSync(DBPath, JSON.stringify({ todos: [] }))
        }
        const data = fs.readFileSync(DBPath)
        return JSON.parse(data)
    } catch (error) {
        console.error("Error reading the database:", error)
        return { todos: [] }
    }
}

// Function to write to db.json with error handling
function writeDB(data) {
    try {
        fs.writeFileSync(DBPath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error("Error writing to the database:", error)
    }
}

// CRUD Routes

// GET -> Read all todos
app.get("/todos", (req, res) => {
    try {
        const db = readDb()
        res.json(db.todos)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

// POST -> Create a new todo
app.post("/todos", (req, res) => {
    try {
        const { title, status } = req.body
        if (!title) {
            return res.status(400).json({ message: "Title is required" })
        }

        const db = readDb()
        const newTodo = {
            id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
            title: title,
            status: status || false
        }
        db.todos.push(newTodo)
        writeDB(db)
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

//PATCH - to update the todos
app.patch('/todos/update-even-ids', (req, res)=> {
    const db = readDb()
    db.todos.forEach(todo => {
        if(todo.id % 2 === 0 && todo.status === false) {
            todo.status = true
        }
    });
    writeDB(db)
    res.json(db.todos)
})

// Del - to del todos
app.delete('/todos/dlete-true-status', (req, res)=> {
    const db = readDb()
    db.todos = db.todos.filter(todo => !todo.status)
    writeDB(db)
    res.status(204).send()
})


app.listen(Port, () => console.log(`Server started on port ${Port}`))
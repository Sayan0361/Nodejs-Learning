/**
 * 🔹 What is an API?
 * API stands for Application Programming Interface.
 * It’s basically a set of rules and definitions that allows two software applications to talk to each other.
 * 
 * 🔹 What is REST?
 * REST = Representational State Transfer.
 * It’s an architectural style used to design web APIs.
 * RESTful APIs allow clients (like frontend apps, mobile apps, Postman, etc.)
 * to interact with servers through HTTP requests.
 * 
 * Example: A React frontend or mobile app can send requests to a Node.js backend.
 * 
 * ---------------------------------------
 * 🔹 Principles of RESTful APIs:
 * ---------------------------------------
 * 1. Statelessness
 *    - Server does not remember the client’s state between requests.
 *    - Every request from the client must contain all required info (like tokens, body data).
 * 
 * 2. Client-Server Architecture
 *    - Client (frontend/mobile) and Server (backend API) are independent.
 *    - Example: React frontend ↔ Express backend.
 * 
 * 3. Uniform Interface
 *    - Use standard HTTP methods:
 *        GET    → Read data
 *        POST   → Create data
 *        PUT    → Update data (replace)
 *        PATCH  → Update data (partial)
 *        DELETE → Remove data
 * 
 * 4. Resource-Based
 *    - Everything is treated as a resource (users, posts, products).
 *    - Each resource is identified by a URL (example: /api/users, /api/products/1).
 * 
 * 5. Representation
 *    - Resources are usually sent in JSON format (but can also be XML, HTML, etc.).
 * 
 * 6. Layered System
 *    - Client doesn’t need to know if data comes directly from server, cache, or DB.
 * 
 * --------------------------------------------------
 * Now let’s implement a RESTful API in Express.js
 * --------------------------------------------------
 * We'll create a CRUD API 
 */

const express = require('express')
const app = express()
const PORT = 8000

// Middlewares - like plugins
app.use(express.json()); // If data comes from the frontend/postman/theunderclient, and it has a header "application/json", then it will do all the transformations for me and give me the actual data (req.body)
// if u dont use this, then data coming from frontend, req.body will result undefined

app.get('/',(req,res)=>{
    res.send("Sever working")
})

/**
 * Fake database (in-memory array)
 * In real-world, this would be replaced with MongoDB, PostgreSQL, MySQL, etc.
 */
const books = [
    {
        id:1,
        title:'Book One',
        author:'Author One'
    },
    {
        id:2,
        title:'Book Two',
        author:'Author 2'
    },
    {
        id:3,
        title:'Book 3',
        author:'Author 3'
    }
];

// Routes
app.get('/books',(req,res)=>{
    res.setHeader('x-custom-header','Author-Sayan Sen') 
    res.json(books) // this will be send books in the format of json
})

app.get('/books/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    if(isNaN(id)) return res.status(400).json(`Bad request: The id must be of type int`)
    
    const book = books.find(e=>e.id===id) 

    if(!book) 
        return res.status(404).json({error:`Not Found: Book with this ${id} doesnt exists`})

    else return res.json(book)
})

app.post('/books',(req,res)=>{
    console.log(req.body) // this will give data only if we use app.use(express.json());
    const {title,author} = req.body;

    if(!title || title==='') return res.status(400).json({error:"Bad Request: title is required"})
    if(!author || author==='') return res.status(400).json({error:"Bad Request: author is required"})
    
    const book = { 
        id: books.length+1,
        title: title,
        author: author
    }
    books.push(book);

    return res.status(201).json({message:`Book created successfully.`})
})

app.delete('/books/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    if(isNaN(id)) return res.status(400).json(`Bad request: The id must be of type int`)
    
    const bookIndex = books.findIndex(e=>e.id===id) 

    if(bookIndex<0) 
        return res.status(404).json({error:`Not Found: Book with this ${id} doesnt exists`})

    books.splice(bookIndex,1)

    return res.status(201).json({message:`Book deleted successfully.`})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

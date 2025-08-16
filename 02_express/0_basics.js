/******************************************************
 * EXPRESS.JS INTRODUCTION
 ******************************************************/

/*
👉 What is Express.js?
- Express.js is a minimal and flexible Node.js web application framework.
- It provides features to build web apps and APIs easily.
- Instead of writing raw HTTP server logic with 'http' module, Express simplifies it.

👉 Why do we need Express.js?
- Node.js itself can create servers (using the 'http' module).
- But building large apps becomes messy (handling routes, middlewares, parsing body, etc.).
- Express gives us:
   1. Routing (easy GET, POST, PUT, DELETE handling)
   2. Middleware support (e.g., logging, authentication, parsing JSON)
   3. Easy integration with templates and databases
   4. Cleaner, faster development compared to raw Node.js HTTP

👉 Difference: Node.js vs Express.js
- Node.js: Runtime environment (can run JS on server, has http module).
- Express.js: A framework built on top of Node.js to make web development easier.

👉 Why Express is better?
- Less code, more features
- Readable & maintainable
- Middleware support
- Works well with databases (MongoDB, MySQL, etc.)
- Huge community, lots of plugins
*/


/******************************************************
 * BASIC EXPRESS SERVER EXAMPLE
 ******************************************************/

// TASK :- BUILD A HTTP SERVER WITH THE FOLLOWING FEATURES:
// 1. GET : '/' SEND SIMPLE HELLO FROM SERVER
// 2. GET : '/contact-us' SEND YOUR EMAIL AND CONTACT NUMBER TO THE USER
// 3. POST : '/tweet' DO A FAKE DB OPERATION AND SEND THE ACK
// 4. GET : '/tweet' SEND ALL THE TWEETS FROM FAKE DB TO USER

// ALSO U NEED TO LOG THE INCOMING REQUESTS WITH TIMESTAMPS IN THE FILE 'log.txt'

const express = require('express')
const app = express()
const PORT = 8000;

app.get('/',(req,res)=>{
    res.send('Homepage')
})

app.get('/contact-us',(req,res)=>{
    res.send('Contact me at sayansen0361@gmail.com')
})

app.post('/tweet',(req,res)=>{
    res.send('Tweet created successfully')
})

app.get('/tweet',(req,res)=>{
    res.send('your tweets are blah blah blah')
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

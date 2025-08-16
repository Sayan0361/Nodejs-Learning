/**
 * ============================
 * HTTP PROTOCOL — THEORY + CODE
 * ============================
 *
 * HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web.
 * It defines how messages are formatted and transmitted, and how servers and browsers
 * should respond to different requests.
 *
 * ✅ Key Points:
 *  - Works on the client-server model.
 *  - Uses TCP (Transmission Control Protocol) underneath (default port: 80, HTTPS uses 443).
 *  - Stateless protocol (each request is independent; server does not remember past requests).
 *
 * ============================
 * HTTP METHODS
 * ============================
 * These specify the type of operation the client wants the server to perform.
 *
 * 1. GET     -> Retrieve data from the server (no body in request).
 * 2. POST    -> Send data to the server (often for creating new records).
 * 3. PUT     -> Update an existing resource completely.
 * 4. PATCH   -> Update part of an existing resource.
 * 5. DELETE  -> Remove a resource from the server.
 * 6. HEAD    -> Same as GET but without the response body (used for metadata).
 * 7. OPTIONS -> Ask the server what methods are supported for a resource.
 *
 * ============================
 * HTTP STATUS CODES
 * ============================
 * These are 3-digit numbers sent by the server to indicate the result of a request.
 *
 * Categories:
 *  1xx -> Informational responses
 *    - 100 Continue: Request received, continue.
 *
 *  2xx -> Success
 *    - 200 OK: Request successful.
 *    - 201 Created: Resource created successfully.
 *    - 204 No Content: Request successful but no data returned.
 *
 *  3xx -> Redirection
 *    - 301 Moved Permanently: Resource moved to a new URL.
 *    - 302 Found: Temporary redirect.
 *    - 304 Not Modified: Resource not changed since last request.
 *
 *  4xx -> Client errors
 *    - 400 Bad Request: Invalid request syntax or data.
 *    - 401 Unauthorized: Authentication required.
 *    - 403 Forbidden: Access denied.
 *    - 404 Not Found: Resource doesn't exist.
 *
 *  5xx -> Server errors
 *    - 500 Internal Server Error: Generic server crash.
 *    - 502 Bad Gateway: Invalid response from upstream server.
 *    - 503 Service Unavailable: Server overloaded or down.
 */


// TASK :- BUILD A HTTP SERVER WITH THE FOLLOWING FEATURES:
// 1. GET : '/' SEND SIMPLE HELLO FROM SERVER
// 2. GET : '/contact-us' SEND YOUR EMAIL AND CONTACT NUMBER TO THE USER
// 3. POST : '/tweet' DO A FAKE DB OPERATION AND SEND THE ACK
// 4. GET : '/tweet' SEND ALL THE TWEETS FROM FAKE DB TO USER

// ALSO U NEED TO LOG THE INCOMING REQUESTS WITH TIMESTAMPS IN THE FILE 'log.txt'

const http = require('http')
const PORT = 8000;
const fs = require('fs')

const server = http.createServer((req,res)=>{
    const method = req.method;
    const path = req.url;

    const log = `\n[${Date.now()}] : ${method} ${path}`;
    fs.appendFileSync('log.txt', log, 'utf-8')

    switch(method){
        case 'GET':{
            switch(path){
                case '/':
                    return res.writeHead(200).end('Hello from the server 🙋‍♂️');
                case '/contact-us':
                    return res.writeHead(200).end('Contact me at sayansen0361@gmail.com');
                case '/tweet':
                    return res.writeHead(200).end('Your tweets');
            }
        }
        break;
        case 'POST':{
            switch(path){
                case '/tweet':
                    // Fake db operation
                    return res.writeHead('201').end('your tweet was created')
            }
        }
    }
    return res.writeHead('404').end('This is not where u are supposed to be')
    
});

server.listen(PORT,()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})

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
 *
 * ============================
 * DEMO — Node.js HTTP Server
 * ============================
 * We'll create a server that handles:
 *  - GET requests (returns data)
 *  - POST requests (receives JSON)
 *  - PUT requests (updates data)
 *  - DELETE requests (deletes data)
 *
 * We'll also send back different HTTP status codes to simulate real-world APIs.
 */

const http = require('http')
const PORT = 8000;

const server = http.createServer((req,res)=>{
    console.log("I got an incoming request")
    // send success status code
    res.writeHead(200,{
        'Content-Type':'application/json'
    })
    res.end("Yes its running...")
});

server.listen(PORT,()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})

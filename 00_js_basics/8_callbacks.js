/*
====================================================
📌 SYNCHRONOUS vs ASYNCHRONOUS CODE in JavaScript
====================================================

📝 In simple terms:
- Synchronous code → Runs line by line, blocking the next line until the current one finishes.
- Asynchronous code → Doesn't wait for the current task to finish, moves to the next line, and runs the task in the background.

📌 Why this matters in Node.js:
Node.js is single-threaded (only one main thread for JS execution), so if you block it with heavy synchronous work, your server can't handle other requests until it's done.

====================================================
EXAMPLE 1 — Synchronous Code
====================================================
*/

console.log("🍵 Step 1: Boil water");
console.log("🍵 Step 2: Add tea leaves");
console.log("🍵 Step 3: Pour tea");
// Runs exactly in order → blocking

/*
OUTPUT:
🍵 Step 1: Boil water
🍵 Step 2: Add tea leaves
🍵 Step 3: Pour tea
*/



/*
====================================================
EXAMPLE 2 — Asynchronous Code (setTimeout demo)
====================================================
*/

console.log("🥚 Step 1: Crack eggs");
setTimeout(() => {
    console.log("🥚 Step 2: Fry eggs (takes time...)");
}, 2000); // 2 seconds delay
console.log("🥚 Step 3: Serve eggs");

/*
Possible OUTPUT:
🥚 Step 1: Crack eggs
🥚 Step 3: Serve eggs
🥚 Step 2: Fry eggs (takes time...)   <-- comes later
*/



/*
====================================================
📌 EVENT LOOP SHORT SUMMARY:
- JS executes synchronous code first.
- Asynchronous tasks are sent to background (Node APIs, Web APIs).
- When ready, their callbacks are pushed to the Event Loop queue.
- The Event Loop picks them up when the call stack is empty.
====================================================
*/



/*
====================================================
📌 CALLBACKS
====================================================
Definition:
-----------
A callback is a function passed as an argument to another function, 
and it's executed later (either synchronously or asynchronously).

Why use callbacks?
------------------
- To run code after a task finishes (especially async tasks like file read, HTTP requests).
- Foundation for async programming before Promises.

====================================================
EXAMPLE 3 — Synchronous Callback
====================================================
*/

function greetUser(name, callback) {
    console.log("Hello " + name);
    callback();
}

greetUser("Sayan", () => {
    console.log("Welcome to Node.js learning!");
});

/*
OUTPUT:
Hello Sayan
Welcome to Node.js learning!
*/



/*
====================================================
EXAMPLE 4 — Asynchronous Callback
====================================================
*/

const fs = require("fs");

fs.readFile("sample.txt", "utf8", (err, data) => {
    if (err) {
        console.error("❌ Error reading file:", err);
        return;
    }
    console.log("📄 File contents:", data);
});
console.log("⏳ Reading file...");

/*
Possible OUTPUT:
⏳ Reading file...
📄 File contents: (file text here)

Here, `readFile` takes a callback that runs AFTER file reading is complete.
*/


/*
====================================================
📌 CALLBACK HELL
====================================================
When callbacks are nested too deeply, making code hard to read and maintain.

Example:
*/

setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
        console.log("Step 2");
        setTimeout(() => {
            console.log("Step 3");
        }, 1000);
    }, 1000);
}, 1000);

// This "pyramid" structure → messy, hard to debug, hard to handle errors
// Solution: Promises or async/await



/*
====================================================
INTERVIEW QUESTIONS:
====================================================
Q1: Is setTimeout synchronous or asynchronous?
A: Asynchronous. It uses Web APIs/Node APIs to handle the timer.

Q2: Can callbacks be synchronous?
A: Yes. It depends on how they're used. (Example: Array.map takes a synchronous callback.)

Q3: What's the problem with callback hell?
A: Hard to read, maintain, and handle errors. Leads to spaghetti code.

Q4: How to avoid callback hell?
A: Use Promises or async/await.
*/

/*
====================================================
📌 ASYNC / AWAIT in JavaScript
====================================================

Definition:
-----------
- async/await is syntactic sugar built on top of Promises.
- It lets you write asynchronous code that looks synchronous.
- 'async' before a function makes it always return a Promise.
- 'await' pauses execution in that function until the Promise settles.

Benefits:
---------
- Cleaner than chaining .then()
- Easier to read and debug
- Works naturally with try/catch for error handling

Important Points:
-----------------
1. 'await' only works inside an 'async' function (or top-level in modern Node versions).
2. Execution pauses at 'await' until the Promise resolves/rejects.
3. Errors from awaited Promises should be handled with try/catch.

====================================================
SYNTAX:
async function myFunc() {
    try {
        const result = await somePromise();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}
====================================================
*/



/*
====================================================
Example 1: Basic async/await
====================================================
*/

function waitOneSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("✅ Done waiting 1 second");
        }, 1000);
    });
}

async function runExample1() {
    console.log("Starting...");
    const result = await waitOneSecond(); // pauses here until resolved
    console.log(result);
    console.log("Finished");
}

runExample1();



/*
====================================================
Example 2: Handling errors with try/catch
====================================================
*/

function riskyPromise() {
    return new Promise((resolve, reject) => {
        let success = false;
        setTimeout(() => {
            if (success) resolve("✅ Operation succeeded");
            else reject(new Error("❌ Operation failed"));
        }, 1000);
    });
}

async function runExample2() {
    try {
        const result = await riskyPromise();
        console.log(result);
    } catch (err) {
        console.error("Caught Error:", err.message);
    } finally {
        console.log("Always runs (cleanup, logging, etc.)");
    }
}

runExample2();



/*
====================================================
Example 3: Reading a file with async/await
====================================================
*/

const fs = require("fs");

function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function runExample3() {
    try {
        const data = await readFilePromise("sample.txt");
        console.log("📄 File contents:", data);
    } catch (err) {
        console.error("Error reading file:", err.message);
    }
}

runExample3();



/*
====================================================
Example 4: Running Promises in parallel with async/await
====================================================
*/

function delay(ms, label) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`✅ ${label} finished in ${ms}ms`);
        }, ms);
    });
}

async function runExample4() {
    const [task1, task2] = await Promise.all([
        delay(1000, "Task 1"),
        delay(2000, "Task 2")
    ]);

    console.log(task1);
    console.log(task2);
}

runExample4();



/*
====================================================
INTERVIEW QUESTIONS:
====================================================

Q1: Is async/await blocking?
A: It only "pauses" inside the async function for that function’s execution; the rest of the program keeps running.

Q2: Can you use await outside an async function?
A: In modern Node.js (v14.8+), yes, with top-level await in ES modules. In older versions, no.

Q3: Difference between .then() and await?
A: .then() uses callbacks for handling resolved values; await uses a cleaner, synchronous-looking style.

Q4: How to run multiple async calls in parallel with async/await?
A: Use Promise.all() with await.

Q5: Does async automatically make a function return a Promise?
A: Yes, even if you return a plain value inside it, it will be wrapped in a Promise.
*/

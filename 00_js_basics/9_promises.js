/*
====================================================
📌 PROMISES in JavaScript
====================================================

Definition:
-----------
A Promise is a special JavaScript object that represents a value
that will be available in the future (or an error if it fails).

It has 3 states:
1. pending   → Initial state (neither resolved nor rejected)
2. fulfilled → Operation completed successfully (resolved)
3. rejected  → Operation failed (rejected)

Why Promises?
-------------
- To handle asynchronous operations in a cleaner way.
- They replace nested callbacks (callback hell).
- They provide better error handling with .catch().

====================================================
BASIC SYNTAX:
new Promise((resolve, reject) => {
    // async task
    if (taskSuccess) resolve(value);
    else reject(error);
})
====================================================
*/


/*
====================================================
Example 1: Creating and using a Promise
====================================================
*/

const myPromise = new Promise((resolve, reject) => {
    let success = true;

    setTimeout(() => {
        if (success) {
            resolve("✅ Promise resolved successfully!");
        } else {
            reject("❌ Promise rejected!");
        }
    }, 1000);
});

// Consuming the Promise
myPromise
    .then(result => {
        console.log("THEN:", result); // runs if resolved
    })
    .catch(error => {
        console.error("CATCH:", error); // runs if rejected
    })
    .finally(() => {
        console.log("FINALLY: Always runs, no matter what.");
    });



/*
====================================================
Example 2: Wrapping an async function in a Promise
====================================================
*/

const fs = require("fs");

function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) reject(err); // reject on error
            else resolve(data);   // resolve with file data
        });
    });
}

// Using the Promise
readFilePromise("sample.txt")
    .then(data => {
        console.log("📄 File Data:", data);
    })
    .catch(err => {
        console.error("❌ Error reading file:", err.message);
    });



/*
====================================================
Example 3: Chaining Promises
====================================================
*/

function stepOne() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 1 complete");
            resolve("Data from Step 1");
        }, 1000);
    });
}

function stepTwo(dataFromStep1) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Step 2 complete with:", dataFromStep1);
            resolve("Data from Step 2");
        }, 1000);
    });
}

// Chain the promises
stepOne()
    .then(stepOneData => stepTwo(stepOneData))
    .then(stepTwoData => console.log("Final output:", stepTwoData))
    .catch(err => console.error("Error in chain:", err));



/*
====================================================
Example 4: Promise.all & Promise.race
====================================================

Promise.all([p1, p2, p3]) → Runs all in parallel, waits for all to finish (or fails if one fails).
Promise.race([p1, p2, p3]) → Runs all in parallel, returns the first one that finishes.
*/

const p1 = new Promise(resolve => setTimeout(() => resolve("P1 done"), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve("P2 done"), 2000));

Promise.all([p1, p2])
    .then(results => console.log("Promise.all results:", results));

Promise.race([p1, p2])
    .then(first => console.log("Promise.race first result:", first));



/*
====================================================
INTERVIEW QUESTIONS:
====================================================

Q1: What are the states of a Promise?
A: pending, fulfilled, rejected.

Q2: Is a Promise synchronous or asynchronous?
A: The executor function runs immediately (synchronous), but resolution/rejection happens asynchronously.

Q3: Difference between resolve() and reject()?
A: resolve() → promise becomes fulfilled.
   reject() → promise becomes rejected.

Q4: What is Promise chaining?
A: Linking multiple .then() calls so each runs after the previous one resolves.

Q5: What happens if you don't handle a rejected Promise?
A: You'll get an "UnhandledPromiseRejectionWarning" in Node.js (or error in strict environments).
*/

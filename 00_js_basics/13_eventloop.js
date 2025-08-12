/*
====================================================
📌 HOW JAVASCRIPT HANDLES ASYNC CODE
====================================================

JavaScript is **single-threaded**:
---------------------------------
- It has ONE main thread (call stack) that runs your code line-by-line.
- But it can still handle async tasks (timers, API calls, file reads)
  using the Event Loop + Web APIs + Task Queues.

----------------------------------------------------
1️⃣ GLOBAL EXECUTION CONTEXT (GEC)
----------------------------------------------------
- When JS starts running, it creates the GEC.
- This contains:
    - Variable Environment (variables, functions)
    - Scope Chain
    - 'this' binding
- The Call Stack starts with the GEC at the bottom.

Example:
---------
console.log("Start"); // runs first
setTimeout(() => console.log("Async"), 0);
console.log("End");   // runs last in sync code
*/


/*
----------------------------------------------------
2️⃣ WEB APIs
----------------------------------------------------
- In the browser: setTimeout, DOM events, fetch, etc.
- In Node.js: timers, fs module, HTTP, etc.
- When you call setTimeout or fetch, they are handed off to these APIs, which run outside the JS thread.
*/


/*
----------------------------------------------------
3️⃣ TASK QUEUES
----------------------------------------------------
There are two main queues for async callbacks:

(1) MACROTASK QUEUE (a.k.a. Task Queue):
    - Stores callbacks from:
        setTimeout, setInterval, setImmediate (Node.js)
        I/O callbacks
        UI rendering tasks
    - Processed one at a time after the call stack is empty.

(2) MICROTASK QUEUE:
    - Stores callbacks from:
        Promises (.then, .catch, .finally)
        process.nextTick (Node.js)
        MutationObserver (browser)
    - Always processed **before** the macrotask queue.

PRIORITY RULE:
--------------
- After the call stack is empty:
    1. Empty the Microtask Queue completely
    2. Then run ONE task from the Macrotask Queue
    3. Repeat
*/


/*
----------------------------------------------------
4️⃣ EVENT LOOP
----------------------------------------------------
- Continuously checks:
    "Is the call stack empty?"
    If YES → run microtasks → run one macrotask → repeat
- This is how async callbacks are scheduled back into JS.
*/


/*
====================================================
📌 DEMO: Microtasks vs Macrotasks
====================================================
*/
console.log("Start");

setTimeout(() => console.log("Macrotask - setTimeout"), 0); // macrotask

Promise.resolve()
    .then(() => console.log("Microtask - Promise then 1"))
    .then(() => console.log("Microtask - Promise then 2"));

console.log("End");

/*
EXPECTED OUTPUT ORDER:
----------------------
Start
End
Microtask - Promise then 1
Microtask - Promise then 2
Macrotask - setTimeout

WHY?
----
1. "Start" → synchronous → runs immediately
2. "End"   → synchronous → runs immediately
3. Promise .then → goes to Microtask Queue
4. setTimeout → goes to Macrotask Queue
5. Event Loop:
   - Stack empty → runs ALL microtasks first (Promises)
   - Then runs macrotasks (setTimeout)
*/


/*
====================================================
📌 INTERVIEW QUESTIONS:
====================================================

Q1: What's the difference between microtasks and macrotasks?
A: Microtasks have higher priority; all are run before the next macrotask.

Q2: Why does Promise.then run before setTimeout?
A: Because Promise callbacks go to the Microtask Queue, which is processed first.

Q3: Is async/await using microtasks or macrotasks?
A: The "await" part internally uses Promises → microtasks.

Q4: Can the microtask queue block the event loop?
A: Yes, if you keep adding new microtasks inside microtasks (infinite loop scenario).

Q5: In Node.js, what runs first — process.nextTick or Promise.then?
A: process.nextTick has even higher priority than Promise microtasks in Node.js.
*/

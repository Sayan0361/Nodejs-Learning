/*
====================================================
📌 ERROR HANDLING IN JAVASCRIPT / NODE.JS
====================================================

WHAT IS ERROR HANDLING?
-----------------------
- Error handling means detecting and dealing with problems in your program so it doesn't crash unexpectedly.
- In JavaScript, errors can be:
    1. **Synchronous errors** → happen immediately (e.g., undefined variable)
    2. **Asynchronous errors** → happen later (e.g., failed API call, DB error)

TYPES OF ERRORS:
----------------
1. SyntaxError → Code is written incorrectly (caught at compile/parse time)
2. ReferenceError → Using a variable that hasn’t been declared
3. TypeError → Wrong data type (e.g., calling a non-function)
4. Custom Errors → Our own error messages for specific scenarios

TOOLS FOR ERROR HANDLING:
-------------------------
1. try...catch → Handles synchronous errors
2. try...catch with async/await → Handles async errors
3. .catch() for Promises
4. throw → Creates and sends an error manually
5. Custom Error classes for more control
*/


/*
====================================================
1️⃣ BASIC try...catch (Synchronous)
====================================================
*/
function syncErrorExample() {
    try {
        let num = 10;
        console.log(num.toUpperCase()); // ❌ TypeError
    } catch (err) {
        console.error("Caught an error:", err.message);
    } finally {
        console.log("This runs no matter what");
    }
}

syncErrorExample();


/*
====================================================
2️⃣ try...catch with async/await
====================================================
*/
async function asyncErrorExample() {
    try {
        const res = await fetch("https://invalidurl.example.com"); // ❌ Network error
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error("Async error caught:", err.message);
    }
}

asyncErrorExample();


/*
====================================================
3️⃣ Handling Promise errors with .catch()
====================================================
*/
fetch("https://invalidurl.example.com")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error("Promise error:", err.message));


/*
====================================================
4️⃣ Throwing errors manually
====================================================
*/
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed"); // ❌ Manual throw
    }
    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (err) {
    console.error("Custom error:", err.message);
}


/*
====================================================
5️⃣ Custom Error Class (Advanced)
====================================================
*/
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

function validateUser(user) {
    if (!user.email) {
        throw new ValidationError("Email is required", "email");
    }
    return true;
}

try {
    validateUser({ name: "Sayan" });
} catch (err) {
    if (err instanceof ValidationError) {
        console.error(`Validation failed on ${err.field}: ${err.message}`);
    } else {
        console.error("Unexpected error:", err.message);
    }
}


/*
====================================================
📌 INTERVIEW QUESTIONS:
====================================================

Q1: Can try...catch handle async errors in setTimeout?
A: No, because setTimeout runs later — must handle errors inside the async callback.

Q2: What's the difference between throw and return?
A: throw stops function execution and sends an error to be caught; return just sends a value.

Q3: Why create custom errors?
A: To make debugging and error handling more specific and meaningful.

Q4: How do you handle errors in promises without async/await?
A: Use .catch() at the end of the chain.

Q5: Does finally run if there's a return inside try or catch?
A: Yes, finally always runs (unless process is killed).
*/

/*
==============================
📌 CLOSURES IN JAVASCRIPT
==============================

Definition:
-----------
A closure is created when a function remembers variables from its outer scope,
even after that outer function has finished executing.


Rules of Closure:
-----------------
1. Inner function has access to:
   - Its own variables
   - Variables of its parent function
   - Global variables

2. Outer function variables are kept in memory as long as the inner function is referenced somewhere.

Use Cases:
----------
- Data hiding (private variables)
- Function factories (generating functions dynamically)
- Maintaining state between function calls
- Implementing module patterns
*/

// ---------------- BASIC EXAMPLE ----------------
function outerFunction() {
    let counter = 0; // This is a private variable

    function increment() { // Inner function forms a closure over 'counter'
        counter++;
        console.log("Counter is now:", counter);
    }

    return increment; // Return the inner function so it can be used outside
}

const myCounter = outerFunction(); 
myCounter(); // Counter is now: 1
myCounter(); // Counter is now: 2
myCounter(); // Counter is now: 3

// Even though outerFunction() has finished, 'counter' is still alive
// because 'myCounter' holds a reference to increment(), which remembers 'counter'.



// ---------------- MULTIPLE CLOSURES WITH INDEPENDENT STATES ----------------
function createCounter(start) {
    let count = start;

    return function () {
        count++;
        console.log("Current count:", count);
    };
}

const counterA = createCounter(0);
const counterB = createCounter(10);

counterA(); // 1
counterA(); // 2
counterB(); // 11
counterB(); // 12

// Each counter has its own 'count' variable stored in its closure.



// ---------------- DATA HIDING EXAMPLE ----------------
function bankAccount(initialBalance) {
    let balance = initialBalance; // Private variable

    return {
        deposit(amount) {
            balance += amount;
            console.log(`Deposited ₹${amount}. Balance: ₹${balance}`);
        },
        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount;
                console.log(`Withdrew ₹${amount}. Balance: ₹${balance}`);
            } else {
                console.log("Insufficient funds!");
            }
        },
        getBalance() {
            console.log(`Current Balance: ₹${balance}`);
        }
    };
}

const myAccount = bankAccount(1000);
myAccount.deposit(500);    // Deposited ₹500. Balance: ₹1500
myAccount.withdraw(200);   // Withdrew ₹200. Balance: ₹1300
myAccount.getBalance();    // Current Balance: ₹1300
// Directly changing 'balance' is impossible here → data is safe inside closure



// ---------------- LOOP PROBLEM FIXED WITH CLOSURE ----------------
for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log("var i:", i); // Outputs 4, 4, 4 → because 'i' is shared
    }, i * 1000);
}

// FIX: Use closure with let or IIFE
for (var i = 1; i <= 3; i++) {
    (function (x) {
        setTimeout(function () {
            console.log("Closure fixed i:", x); // Outputs 1, 2, 3
        }, x * 1000);
    })(i);
}



// ---------------- INTERVIEW QUESTIONS ----------------
/*
Q1: What is a closure?
A: A closure is a function that remembers variables from its outer scope
   even after the outer function has finished executing.

Q2: What are some real-world uses of closures?
A: Private variables, function factories, callbacks in async operations.

Q3: Do closures take up memory?
A: Yes, as long as the inner function exists, the variables in the closure
   are kept in memory.

Q4: How to avoid memory leaks with closures?
A: Remove references to inner functions when no longer needed, so garbage collector
   can clean up the variables.

Q5: What's the difference between closure and scope?
A: Scope is the current set of variables available at a certain point in code.
   Closure is when a function keeps access to variables from a scope even after
   that scope has closed.
*/

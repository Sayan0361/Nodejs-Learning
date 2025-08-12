/*
=========================================
📌 HIGHER-ORDER FUNCTIONS IN JAVASCRIPT
=========================================

Definition:
-----------
A Higher-Order Function (HOF) is a function that:
1. Takes another function as an argument (callback)
   OR
2. Returns a function as its result

Why use HOFs?
-------------
- More reusable code
- Less repetitive loops
- Cleaner & more readable operations
*/


// ---------------- EXAMPLE OF A BASIC HOF ----------------
function greetUser(name, formatter) {
    // `formatter` is a function passed as an argument
    return formatter(name);
}

function upperCaseName(str) {
    return str.toUpperCase();
}

console.log(greetUser("Sayan", upperCaseName)); // SAYAN



/*
=========================================
📌 forEach
=========================================

- Executes a provided function once for each array element
- Always returns `undefined` (not chainable)
- Good for side effects (e.g., logging, updating external variables)
*/

const nums = [1, 2, 3, 4, 5];

nums.forEach(function(num, index) {
    console.log(`Index ${index} → ${num}`);
});
// Output:
// Index 0 → 1
// Index 1 → 2
// ...



/*
=========================================
📌 map
=========================================

- Transforms each element in the array
- Returns a **new array** (chainable)
- Does NOT mutate the original array
*/

const doubled = nums.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]



/*
=========================================
📌 filter
=========================================

- Returns a **new array** with elements that pass a condition
- Does NOT mutate the original array
*/

const evens = nums.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]



/*
=========================================
📌 reduce
=========================================

- Reduces the array to a single value
- Takes a reducer callback with:
    (accumulator, currentValue) => newAccumulator
- Optional initial value for the accumulator
*/

const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Without initial value, first element is used as `acc`
// So reduce starts from the 2nd element



/*
=========================================
📌 COMBINING THEM
=========================================
Example: Square the even numbers and sum them
*/

const result = nums
    .filter(n => n % 2 === 0)  // [2, 4]
    .map(n => n * n)           // [4, 16]
    .reduce((acc, curr) => acc + curr, 0); // 20

console.log(result); // 20


/*
================================================
📌 REAL-WORLD NODE.JS USE CASE FOR map, filter, reduce
================================================
Scenario:
---------
We have an API that returns a list of users.
We want to:
  1. Fetch the data
  2. Filter only active users
  3. Map to their email addresses
  4. Count how many users are from a specific domain (e.g., "@gmail.com")
*/

const axios = require("axios");

// Async function to handle the process
async function processUsers() {
    try {
        // 1️⃣ Fetch data from a sample API
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");

        // This API returns fake data, so we'll fake "active" status for demo purposes
        const users = response.data.map(user => ({
            ...user,
            active: Math.random() > 0.5 // Random true/false for demo
        }));

        console.log("✅ All Users:", users.length);

        // 2️⃣ Filter only active users
        const activeUsers = users.filter(user => user.active);
        console.log("✅ Active Users:", activeUsers.length);

        // 3️⃣ Map to email addresses
        const emails = activeUsers.map(user => user.email);
        console.log("📧 Emails of active users:", emails);

        // 4️⃣ Count how many active users have Gmail accounts
        const gmailCount = emails.reduce((count, email) => {
            return email.endsWith("@gmail.com") ? count + 1 : count;
        }, 0);

        console.log(`📊 Number of active Gmail users: ${gmailCount}`);

    } catch (error) {
        console.error("❌ Error fetching or processing users:", error.message);
    }
}

processUsers();


/*
================================================
INTERVIEW-LEVEL TAKEAWAYS:
================================================
Q1: Why use map/filter/reduce over for loops?
A: More declarative, easier to read, chainable.

Q2: Does this mutate the original API data?
A: No, map/filter/reduce return new arrays, leaving the original untouched.

Q3: Where is async/await used here?
A: To handle axios's Promise when fetching data from the API.

Q4: Can we make this more efficient?
A: Yes, we could combine steps into a single reduce call to avoid creating multiple intermediate arrays.

Q5: Is this synchronous or asynchronous?
A: Data fetching with axios is asynchronous (handled with await),
   but map/filter/reduce themselves are synchronous array operations.
*/


/*
=========================================
INTERVIEW QUESTIONS
=========================================

Q1: Difference between forEach and map?
A: forEach → no return value (undefined), used for side effects.
   map → returns new array, used for transformations.

Q2: Can filter change the original array?
A: No, it returns a new filtered array.

Q3: What happens if you don’t provide an initial value to reduce?
A: The first element becomes the initial accumulator,
   and iteration starts from the second element.

Q4: Can these HOFs be used on objects?
A: No, they're array methods, but you can use Object.keys/values/entries
   to convert objects into arrays first.

Q5: Are these synchronous or asynchronous?
A: These methods are synchronous — they run top to bottom in order.
*/

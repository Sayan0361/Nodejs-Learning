/*
=========================================
📌 REST & SPREAD OPERATORS (... in JS)
=========================================

The `...` (three dots) in JavaScript can mean:
1. REST → Collect multiple elements into a single array/object
2. SPREAD → Expand an array/object into individual elements

The meaning depends on where you use it:
- REST → In function parameters or destructuring (collects)
- SPREAD → In arrays/objects or function calls (expands)
*/



// ---------------- REST OPERATOR ----------------
/*
Rest "collects" all remaining values into a single variable.
Use case: when you don’t know how many arguments will be passed.
*/

// Example 1: Function parameters
function sumAll(...numbers) { // REST collects args into an array
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15


// Example 2: Array destructuring
const [first, second, ...others] = [10, 20, 30, 40, 50];
console.log(first); // 10
console.log(second); // 20
console.log(others); // [30, 40, 50]


// Example 3: Object destructuring
const user = { id: 1, name: "Sayan", age: 21, city: "Kolkata" };
const { name, ...otherDetails } = user;
console.log(name); // Sayan
console.log(otherDetails); // { id: 1, age: 21, city: 'Kolkata' }



// ---------------- SPREAD OPERATOR ----------------
/*
Spread "expands" elements from an array/object into separate values.
Use case: copy, merge, or pass elements individually.
*/

// Example 1: Passing array elements to a function
const nums = [4, 9, 2];
console.log(Math.max(...nums)); // 9


// Example 2: Copying arrays
const arr1 = [1, 2, 3];
const arrCopy = [...arr1];
console.log(arrCopy); // [1, 2, 3]

// Example 3: Merging arrays
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]


// Example 4: Copying objects
const car = { brand: "Tesla", model: "Model S" };
const carCopy = { ...car };
console.log(carCopy); // { brand: 'Tesla', model: 'Model S' }

// Example 5: Merging objects
const extra = { color: "Red", year: 2025 };
const mergedCar = { ...car, ...extra };
console.log(mergedCar); // { brand: 'Tesla', model: 'Model S', color: 'Red', year: 2025 }


// ---------------- KEY DIFFERENCE ----------------
/*
REST = "pack" multiple values into one
SPREAD = "unpack" one value into multiple
*/


// ---------------- INTERVIEW QUESTIONS ----------------
/*
Q1: What's the difference between Rest and Spread operators?
A: Rest collects multiple values into an array/object (used in params/destructuring).
   Spread expands arrays/objects into individual elements (used in function calls, array/object literals).

Q2: Can we use Rest in array literals?
A: No. Rest only works in destructuring and function params.

Q3: Can we use Spread in function parameters?
A: No. In parameters, it's Rest. Spread is used when calling functions.

Q4: Does Spread create a deep copy?
A: No. It creates a shallow copy (nested objects are still referenced).
*/


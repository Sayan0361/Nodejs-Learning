/*
=========================================
📌 var, let, and const in JavaScript
=========================================

JavaScript has three ways to declare variables:
1. var
2. let
3. const

They differ in:
- Scope (function vs block)
- Hoisting behavior
- Re-declaration and re-assignment
- Use cases
*/

// ---------------- SCOPE DIFFERENCES ----------------

function scopeTest() {
    if (true) {
        var x = 10; // function-scoped
        let y = 20; // block-scoped
        const z = 30; // block-scoped
        console.log("Inside block:", x, y, z); // 10 20 30
    }
    console.log("Outside block (var):", x); // ✅ Works: 10
    // console.log("Outside block (let):", y); // ❌ Error: y is not defined
    // console.log("Outside block (const):", z); // ❌ Error: z is not defined
}

scopeTest();



// ---------------- HOISTING BEHAVIOR ----------------
/*
Hoisting = Variable declarations are moved to the top of their scope during compilation.
BUT:
- var variables are hoisted and initialized with 'undefined'
- let and const are also hoisted BUT are in a "temporal dead zone" (TDZ) until they are assigned
*/

console.log(a); // undefined (hoisted + initialized)
var a = 5;

// console.log(b); // ❌ Error: Cannot access 'b' before initialization
let b = 10;

// console.log(c); // ❌ Error: Cannot access 'c' before initialization
const c = 15;



// ---------------- RE-DECLARATION & RE-ASSIGNMENT ----------------

// var → can be re-declared & re-assigned
var name = "Krishna";
var name = "Sayan"; // ✅ Works (re-declared)
name = "Amit"; // ✅ Works (re-assigned)
console.log("var name:", name); // Amit

// let → cannot be re-declared in same scope, can be re-assigned
let city = "Kolkata";
// let city = "Delhi"; // ❌ Error: Identifier 'city' has already been declared
city = "Vrindavan"; // ✅ Works
console.log("let city:", city);

// const → cannot be re-declared or re-assigned (must be initialized)
const country = "India";
// const country = "USA"; // ❌ Error
// country = "Nepal"; // ❌ Error
console.log("const country:", country);

// Note: const objects & arrays can have their properties modified
const person = { name: "Sayan" };
person.name = "Amit"; // ✅ Allowed
console.log("Modified const object:", person);



// ---------------- BEST PRACTICES ----------------
/*
- Use 'const' by default for variables you don’t plan to reassign
- Use 'let' when you know the value will change
- Avoid 'var' unless you specifically need function-scoping (rare in modern JS)
*/



// ---------------- INTERVIEW QUESTIONS ----------------
/*
Q1: What is the difference between var, let, and const?
A: var is function-scoped, can be re-declared and re-assigned, hoisted with undefined.
   let is block-scoped, can be re-assigned, not re-declared in same scope, hoisted but in TDZ.
   const is block-scoped, cannot be re-assigned, must be initialized at declaration.

Q2: What is the Temporal Dead Zone (TDZ)? (important)
A: The time between the start of a block and the point where a variable declared with let/const is initialized.

Q3: Which one should be preferred in modern JavaScript?
A: const by default, let when re-assignment is needed, avoid var unless necessary for legacy code.

Q4: Can const objects be mutated?
A: Yes, properties can change, but the reference to the object itself cannot be reassigned.
*/

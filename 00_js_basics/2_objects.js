/*
=========================================
📌 OBJECTS IN JAVASCRIPT
=========================================

Definition:
-----------
An object in JavaScript is a collection of key-value pairs where:
- Keys are strings (or Symbols)
- Values can be anything (numbers, strings, functions, arrays, other objects)

*/

// ---------------- OBJECT CREATION METHODS ----------------

// 1. Object literal (most common)
const obj1 = {
    name: "Sayan",
    age: 21,
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    }
};
obj1.greet(); // Hello, my name is Sayan


// 2. Using new Object() constructor
const obj2 = new Object();
obj2.name = "Krishna";
obj2.age = 1000;
console.log(obj2);


// 3. Using Object.create() (for prototype inheritance)
const proto = {
    sayHi() {
        console.log("Hi from prototype!");
    }
};
const obj3 = Object.create(proto);
obj3.sayHi(); // Hi from prototype!


// 4. Using class (ES6+)
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hi, I am ${this.name}`);
    }
}
const obj4 = new Person("Amit", 25);
obj4.greet();



// ---------------- ACCESSING PROPERTIES ----------------
const student = { name: "Arjun", marks: 95 };

// Dot notation
console.log(student.name);

// Bracket notation (useful when key is dynamic or has spaces)
console.log(student["marks"]);

const key = "name";
console.log(student[key]); // Arjun



// ---------------- ADD / MODIFY / DELETE PROPERTIES ----------------
student.class = "12th"; // Add new property
student.marks = 98; // Modify property
delete student.class; // Delete property
console.log(student);



// ---------------- METHODS IN OBJECTS ----------------
const calculator = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    }
};
console.log(calculator.add(5, 3)); // 8



// ---------------- NESTED OBJECTS ----------------
const user = {
    id: 1,
    profile: {
        username: "sayancode",
        details: {
            email: "sayan@example.com"
        }
    }
};
console.log(user.profile.details.email);



// ---------------- OBJECT METHODS ----------------
const car = { brand: "Tesla", model: "Model 3", year: 2025 };

console.log(Object.keys(car));    // [ 'brand', 'model', 'year' ]
console.log(Object.values(car));  // [ 'Tesla', 'Model 3', 2025 ]
console.log(Object.entries(car)); // [ ['brand', 'Tesla'], ['model', 'Model 3'], ['year', 2025] ]



// ---------------- OBJECT DESTRUCTURING ----------------
const { brand, year } = car;
console.log(brand, year); // Tesla 2025

// Rename while destructuring
const { model: carModel } = car;
console.log(carModel); // Model 3



// ---------------- SPREAD & REST IN OBJECTS ----------------
const updatedCar = { ...car, color: "Red" }; // Spread adds/overrides
console.log(updatedCar);

const { model, ...restProps } = car; // Rest collects remaining props
console.log(restProps);



// ---------------- INTERVIEW QUESTIONS ----------------
/*
Q1: Difference between dot notation and bracket notation?
A: Dot is simpler but only works with valid JS identifiers (no spaces/special chars).
   Bracket works with any string and allows dynamic keys.

Q2: Difference between Object.create() and class/constructor?
A: Object.create() directly sets prototype. Class/constructor defines blueprint for creating multiple instances.

Q3: How to check if a property exists in an object?
A:
   'key' in obj      → checks own + inherited properties
   obj.hasOwnProperty('key') → checks only own properties

Q4: Are objects in JS mutable?
A: Yes, even if declared with const, their properties can change.

Q5: How to make an object immutable?
A: Use Object.freeze(obj) → prevents adding, deleting, or modifying properties.
*/

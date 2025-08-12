/*
=========================================
📌 CONSTRUCTORS IN JAVASCRIPT
=========================================

A Constructor Function is:
- A regular function used to create multiple similar objects.
- By convention, the name starts with a capital letter (e.g., Person, Car).
- Used with the `new` keyword.

What `new` does under the hood:
--------------------------------
1. Creates an empty object → {}
2. Sets the new object's `__proto__` to the constructor's `prototype`
3. Calls the constructor function with `this` pointing to the new object
4. Returns the new object (unless the constructor explicitly returns another object)
*/


// ---------------- BASIC CONSTRUCTOR EXAMPLE ----------------
function Person(name, age) {
    this.name = name; // property
    this.age = age;   // property

    // instance method (not memory efficient if created here)
    this.sayHi = function () {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    };
}

const p1 = new Person("Sayan", 21);
const p2 = new Person("Krishna", 22);

p1.sayHi(); // Hi, I'm Sayan and I'm 21 years old.
p2.sayHi(); // Hi, I'm Krishna and I'm 22 years old.


// ---------------- PROTOTYPE OPTIMIZATION ----------------
/*
If you define methods inside the constructor,
each object gets its own copy → memory waste.
Better: put shared methods on the constructor's prototype.
*/

function Student(name, roll) {
    this.name = name;
    this.roll = roll;
}

// shared method via prototype
Student.prototype.greet = function () {
    console.log(`Hello, I'm ${this.name} (Roll: ${this.roll})`);
};

const s1 = new Student("Amit", 101);
const s2 = new Student("Rohit", 102);

console.log(s1.greet === s2.greet); // true → same function reference
s1.greet(); // Hello, I'm Amit (Roll: 101)


// ---------------- CONSTRUCTOR RETURN BEHAVIOR ----------------
function WeirdConstructor() {
    this.msg = "Hello";
    return { custom: "This replaces the instance" }; // returning an object overrides `this`
}
const weird = new WeirdConstructor();
console.log(weird); // { custom: "This replaces the instance" }


// ---------------- SELF-CALLING WITHOUT `new` ----------------
function Car(brand) {
    if (!(this instanceof Car)) {
        // If someone forgets `new`, auto-correct
        return new Car(brand);
    }
    this.brand = brand;
}
const c1 = Car("Tesla"); // works even without `new`
console.log(c1.brand); // Tesla


/*
=====================
INTERVIEW QUESTIONS
=====================

Q1: What's the difference between a regular function and a constructor function?
A: Technically nothing — constructors are just regular functions called with `new`.
   The difference is in how they’re used and named.

Q2: Why is it a bad idea to define methods inside the constructor?
A: It creates a new copy of the function for every object, wasting memory.

Q3: What happens if a constructor explicitly returns an object?
A: That object replaces `this` and becomes the return value.

Q4: How to ensure a constructor works even if someone forgets `new`?
A: Check `this instanceof Constructor` and call `new` inside.

Q5: Are constructors and classes the same?
A: No. Classes are syntactic sugar over constructor + prototype pattern.
*/


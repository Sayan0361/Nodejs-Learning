/*
=========================================
📌 ES6 CLASSES IN JAVASCRIPT
=========================================

- Introduced in ES6 (2015)
- Syntax sugar over constructor functions + prototypes
- Still prototype-based under the hood
- More readable and structured than old constructor functions

Why use classes?
-----------------
- Cleaner syntax for inheritance
- Group related data and methods in one place
- Easier to maintain and read for OOP-style code
*/


// ---------------- BASIC CLASS EXAMPLE ----------------
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // method added to prototype
    sayHi() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    }
}

const p1 = new Person("Sayan", 21);
const p2 = new Person("Krishna", 22);

p1.sayHi(); // Hi, I'm Sayan and I'm 21 years old.
p2.sayHi(); // Hi, I'm Krishna and I'm 22 years old.

console.log(p1.sayHi === p2.sayHi); // true → shared method via prototype



// ---------------- CLASS INHERITANCE ----------------
class Animal {
    constructor(type) {
        this.type = type;
    }
    speak() {
        console.log(`${this.type} makes a sound.`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super("Dog"); // call parent constructor
        this.name = name;
    }
    bark() {
        console.log(`${this.name} says: Woof!`);
    }
}

const dog1 = new Dog("Bruno");
dog1.speak(); // Dog makes a sound. (inherited from Animal)
dog1.bark();  // Bruno says: Woof!



/*
=====================
CLASSES VS CONSTRUCTORS
=====================

1️⃣ Syntax:
   - Constructors: function + manually attach to prototype
   - Classes: cleaner syntax, methods auto-go to prototype

2️⃣ Inheritance:
   - Constructors: use Object.create + call parent constructor manually
   - Classes: use `extends` + `super()`

3️⃣ Hoisting:
   - Constructors: function declarations are hoisted
   - Classes: NOT hoisted (must be declared before use)

4️⃣ Strict Mode:
   - Classes run in strict mode by default
   - Constructors need `"use strict"` manually

5️⃣ Under the hood:
   - Both still use prototype-based inheritance
   - Class is just syntactic sugar

*/


/*
=====================
INTERVIEW QUESTIONS
=====================

Q1: Are JS classes the same as in Java/C++?
A: No — JS classes are syntactic sugar over prototypes, not true classical OOP.

Q2: Where do class methods get stored?
A: On the class's prototype, so they're shared by all instances.

Q3: Can you have private variables in classes?
A: Yes, using `#privateVar` syntax (ES2020) or closures.

Q4: Can you call a class without `new`?
A: No, calling without `new` throws an error.

Q5: How is inheritance handled in classes?
A: Using `extends` for prototype linking and `super()` to call parent constructor.
*/


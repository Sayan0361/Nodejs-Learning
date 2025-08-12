/*
====================================================
📚 OBJECT-ORIENTED PROGRAMMING (OOP) IN JAVASCRIPT
====================================================

📝 WHAT IS OOP?
- A programming style where we group related data (properties) and behaviors (methods) into units called "objects".
- Example: A "Car" has properties like brand, model, and speed, and methods like start(), stop(), accelerate().
- OOP helps make code more reusable, maintainable, and readable.

----------------------------------------------------
🔹 4 MAIN PRINCIPLES OF OOP:
1. **Encapsulation** → Grouping data & methods inside an object to keep them together and safe.
2. **Abstraction** → Showing only what’s necessary, hiding the complex internal logic.
3. **Inheritance** → Making new classes that reuse and extend existing ones.
4. **Polymorphism** → Same method name can have different behaviors in different objects.

----------------------------------------------------
💡 HOW JS DOES OOP:
- JavaScript is **prototype-based**, not class-based (under the hood).
- ES6 introduced `class` and `extends` keywords to make syntax look more like traditional OOP languages (Java, C++).
- Underneath, classes still use **prototypes**.

====================================================
*/


// ----------------------------------------------
// 1️⃣ CLASS CREATION & OBJECTS
// ----------------------------------------------

// A class is a blueprint for objects
class Person {
    // The constructor method runs automatically when a new object is created from the class
    constructor(name, age) {
        this.name = name;  // public property
        this.age = age;
    }

    // This is a public method that will be shared across all objects of this class
    greet() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    }
}

// Creating an object (instance) from the class
const person1 = new Person("Alice", 25);
person1.greet(); // "Hi, I'm Alice and I'm 25 years old."


// ----------------------------------------------
// 2️⃣ INHERITANCE (extends keyword)
// ----------------------------------------------

// Inheritance lets a class (child) use properties & methods from another class (parent)
class Student extends Person {
    constructor(name, age, grade) {
        // super() calls the parent constructor so we don't repeat code
        super(name, age);
        this.grade = grade;
    }

    // Overriding the greet() method (polymorphism in action)
    greet() {
        console.log(`Hi, I'm ${this.name}, ${this.age} years old, and in grade ${this.grade}.`);
    }
}

const student1 = new Student("Bob", 18, "12th");
student1.greet(); // Uses the overridden method


// ----------------------------------------------
// 3️⃣ ENCAPSULATION (Private fields)
// ----------------------------------------------

// Private properties start with `#` and can only be accessed inside the class
class BankAccount {
    #balance; // private property

    constructor(owner, initialBalance) {
        this.owner = owner;
        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            console.log(`Deposited: ${amount}`);
        }
    }

    getBalance() {
        return `Current balance: ${this.#balance}`;
    }
}

const acc = new BankAccount("Charlie", 1000);
acc.deposit(500);
console.log(acc.getBalance()); // "Current balance: 1500"
// console.log(acc.#balance); ❌ Error: Cannot access private field


// ----------------------------------------------
// 4️⃣ STATIC METHODS
// ----------------------------------------------

// Static methods belong to the class itself, not to instances
class MathHelper {
    static add(a, b) {
        return a + b;
    }
}

// Call static method without creating an object
console.log(MathHelper.add(5, 3)); // 8


// ----------------------------------------------
// 5️⃣ OLD SCHOOL OOP: Constructor Functions
// ----------------------------------------------

// Before ES6 classes, this was the way to create "classes"
function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

// Methods are added to the prototype so all objects share them
Car.prototype.getDetails = function() {
    return `${this.brand} ${this.model}`;
};

const car1 = new Car("Toyota", "Corolla");
console.log(car1.getDetails()); // "Toyota Corolla"


// ----------------------------------------------
// 6️⃣ PROTOTYPE INHERITANCE USING Object.create
// ----------------------------------------------

// This creates an object that inherits directly from another object
const animal = {
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
};

const dog = Object.create(animal); // dog now has animal as its prototype
dog.name = "Buddy";
dog.speak(); // "Buddy makes a noise."


/*
====================================================
📌 QUICK COMPARISON TABLE:
----------------------------------------------------
CLASS (ES6)               | CONSTRUCTOR FUNCTION
----------------------------------------------------
Modern & clean syntax     | Old style before ES6
Uses `class` & `extends`  | Uses function & prototype
Easy to read              | More manual setup
Still prototype-based     | Direct prototype handling

====================================================
💡 INTERVIEW QUESTIONS:
----------------------------------------------------
Q1: Is JavaScript purely OOP?
A: No, JS is multi-paradigm — it supports procedural, functional, and OOP styles.

Q2: What is the difference between class-based and prototype-based OOP?
A: Class-based is just syntax sugar in JS; under the hood, it’s still prototype-based.

Q3: How to make private variables in JS?
A: Use `#privateField` (new way) or closures (old way).

Q4: What does `super()` do?
A: Calls the parent constructor or parent method.

Q5: Can we have multiple inheritance in JS?
A: Not directly, but we can use mixins to combine behaviors.
====================================================
*/

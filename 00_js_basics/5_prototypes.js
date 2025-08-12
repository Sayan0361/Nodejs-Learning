/*
=========================================
📌 PROTOTYPES & INHERITANCE IN JAVASCRIPT
=========================================

JavaScript is prototype-based, not class-based (although ES6 `class` syntax
makes it look like classical OOP).

Every object in JS has a hidden property called `[[Prototype]]` (or `__proto__`)
which points to another object. That object is the "prototype" from which it can inherit properties.

Prototype chain = series of objects linked by `__proto__`.

Why?
-----
- Helps with memory efficiency (methods are shared, not copied)
- Enables inheritance (one object can use another object's properties/methods)
*/



// ---------------- BASIC PROTOTYPE EXAMPLE ----------------
const obj = {};
console.log(obj.__proto__); // Object prototype (has toString, hasOwnProperty, etc.)

console.log(obj.__proto__.__proto__); // null → end of chain



// ---------------- FUNCTION PROTOTYPES ----------------
function Person(name) {
    this.name = name;
}

// Adding method to prototype (shared across all instances)
Person.prototype.sayHello = function () {
    console.log(`Hello, I am ${this.name}`);
};

const p1 = new Person("Sayan");
const p2 = new Person("Krishna");

p1.sayHello(); // Hello, I am Sayan
p2.sayHello(); // Hello, I am Krishna

// The method is NOT copied to each object, it's referenced via prototype
console.log(p1.sayHello === p2.sayHello); // true



// ---------------- PROTOTYPE CHAIN ----------------
console.log(p1.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true



// ---------------- INHERITANCE WITH PROTOTYPES ----------------
function Animal(type) {
    this.type = type;
}
Animal.prototype.speak = function () {
    console.log(`${this.type} makes a sound.`);
};

function Dog(name) {
    Animal.call(this, "Dog"); // Call parent constructor
    this.name = name;
}

// Set Dog prototype to inherit from Animal prototype
Dog.prototype = Object.create(Animal.prototype);

// Fix constructor reference
Dog.prototype.constructor = Dog;

// Add dog-specific method
Dog.prototype.bark = function () {
    console.log(`${this.name} says: Woof!`);
};

const myDog = new Dog("Bruno");
myDog.speak(); // Dog makes a sound. (inherited from Animal)
myDog.bark();  // Bruno says: Woof! (own method)



// ---------------- ES6 CLASS SYNTAX ----------------
class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }
    drive() {
        console.log(`${this.brand} is driving`);
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super(brand); // calls Vehicle constructor
        this.model = model;
    }
    honk() {
        console.log(`${this.brand} ${this.model} says: Beep!`);
    }
}

const tesla = new Car("Tesla", "Model 3");
tesla.drive(); // Tesla is driving
tesla.honk();  // Tesla Model 3 says: Beep!



/*
=====================
INTERVIEW QUESTIONS
=====================

Q1: What's a prototype in JavaScript?
A: It's an object from which other objects inherit properties/methods via prototype chain.

Q2: Difference between __proto__ and prototype?
A:
- `__proto__` → property of an object that points to its prototype.
- `prototype` → property of functions (constructor functions) used to set new objects' prototype.

Q3: How does inheritance work in JS?
A: Objects look for properties/methods in themselves first, then in their prototype, and so on, until reaching `null`.

Q4: Does ES6 `class` remove prototypes?
A: No. Classes are just syntactic sugar over prototype-based inheritance.

Q5: Why add methods to prototype instead of inside constructor?
A: Saves memory — all instances share the same method reference.
*/


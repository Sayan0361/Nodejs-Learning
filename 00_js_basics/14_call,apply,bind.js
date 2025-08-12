/*
====================================================
📌 CALL, APPLY, BIND in JavaScript
====================================================

WHAT ARE THEY?
--------------
- All three are methods available on JavaScript functions.
- They allow you to **control what 'this' refers to** when you call a function.
- Useful for borrowing methods, function reuse, or ensuring correct context in callbacks.

SYNTAX:
-------
func.call(thisArg, arg1, arg2, ...)
func.apply(thisArg, [argsArray])
func.bind(thisArg, arg1, arg2, ...)

KEY DIFFERENCE:
---------------
- call → Calls function immediately, passes arguments individually.
- apply → Calls function immediately, passes arguments as an array.
- bind → Does NOT call immediately, returns a new function with 'this' bound.
*/


/*
====================================================
1️⃣ Example object + method
====================================================
*/
const person = {
    name: "Sayan",
    greet: function (city, country) {
        console.log(`Hi, I'm ${this.name} from ${city}, ${country}`);
    }
};

const person2 = { name: "Rahul" };


/*
====================================================
2️⃣ Using call()
====================================================
- Calls function immediately
- Passes arguments one by one
*/
person.greet.call(person2, "Kolkata", "India");  
// Output: Hi, I'm Rahul from Kolkata, India


/*
====================================================
3️⃣ Using apply()
====================================================
- Calls function immediately
- Passes arguments as an array
*/
person.greet.apply(person2, ["Kolkata", "India"]);  
// Output: Hi, I'm Rahul from Kolkata, India


/*
====================================================
4️⃣ Using bind()
====================================================
- Returns a new function with 'this' bound
- You can call it later
*/
const boundGreet = person.greet.bind(person2, "Kolkata", "India");
boundGreet();  
// Output: Hi, I'm Rahul from Kolkata, India


/*
====================================================
📌 ANOTHER REAL-LIFE EXAMPLE:
====================================================
*/
const car = {
    brand: "Tesla",
    getBrand: function () {
        return this.brand;
    }
};

const bike = { brand: "Yamaha" };

console.log(car.getBrand.call(bike)); // Yamaha
console.log(car.getBrand.apply(bike)); // Yamaha

const bikeBrandFn = car.getBrand.bind(bike);
console.log(bikeBrandFn()); // Yamaha


/*
====================================================
📌 INTERVIEW QUESTIONS:
====================================================

Q1: Difference between call and apply?
A: call → arguments individually, apply → arguments in array.

Q2: Which one returns a new function?
A: bind

Q3: Why do we need these methods?
A: To change 'this' context and reuse functions.

Q4: Can bind be used for partial application?
A: Yes — you can preset some arguments.

Q5: What if you pass null/undefined as 'thisArg'?
A: In non-strict mode → 'this' defaults to the global object (window in browsers, global in Node.js).
*/


// | Method | Runs immediately? | How to pass arguments       |
// | ------ | ----------------- | --------------------------- |
// | call   | ✅ Yes             | Individually: `arg1, arg2`  |
// | apply  | ✅ Yes             | In an array: `[arg1, arg2]` |
// | bind   | ❌ No (returns fn) | Individually: `arg1, arg2`  |

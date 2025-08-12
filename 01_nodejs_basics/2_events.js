// EventEmitter in Node.js is basically a built-in “event manager” that lets different parts of your code talk to each other without being directly connected.

// Import EventEmitter class from Node.js built-in 'events' module
const EventEmitter = require("events");

// Create an EventEmitter instance
// Think of this as a "group" where we can send and receive events
const eventEmitter = new EventEmitter();

// ---------------- BASIC LISTENER ----------------
// 'on' method means: "Whenever event 'greet' happens, run this function"
eventEmitter.on("greet", () => {
    console.log("👋 Hello there!");
});

// ---------------- MULTIPLE LISTENERS ----------------
// We can add another listener for the same event
eventEmitter.on("greet", () => {
    console.log("😊 How are you?");
});

// ---------------- PASSING DATA WITH EVENTS ----------------
// Listener that takes a parameter
eventEmitter.on("welcome", (name) => {
    console.log(`🎉 Welcome, ${name}!`);
});

// ---------------- ONE-TIME LISTENER ----------------
// 'once' method runs the listener only the first time the event is emitted
eventEmitter.once("firstLogin", () => {
    console.log("🔑 Logged in for the first time!");
});

// ---------------- REMOVING A LISTENER ----------------
// Create a listener function we can remove later
function temporaryListener() {
    console.log("⏳ I will be removed soon...");
}

// Attach the temporary listener
eventEmitter.on("tempEvent", temporaryListener);

// ---------------- EMITTING EVENTS ----------------
console.log("\n--- Emitting 'greet' ---");
eventEmitter.emit("greet"); // Runs all greet listeners
// Output:
// 👋 Hello there!
// 😊 How are you?

console.log("\n--- Emitting 'welcome' with name ---");
eventEmitter.emit("welcome", "Sayan");
// Output:
// 🎉 Welcome, Sayan!

console.log("\n--- Emitting 'firstLogin' twice ---");
eventEmitter.emit("firstLogin"); // Runs once
eventEmitter.emit("firstLogin"); // Won't run again
// Output:
// 🔑 Logged in for the first time!

console.log("\n--- Emitting 'tempEvent' before removal ---");
eventEmitter.emit("tempEvent"); 
// Output:
// ⏳ I will be removed soon...

// Remove the temporary listener
eventEmitter.removeListener("tempEvent", temporaryListener);

console.log("\n--- Emitting 'tempEvent' after removal ---");
eventEmitter.emit("tempEvent"); // No output

/*
💡 Summary of EventEmitter:
1. .on(eventName, callback)  → Listen to an event (can run multiple times)
2. .once(eventName, callback) → Listen only the first time the event is emitted
3. .emit(eventName, ...args)  → Trigger the event and optionally pass data
4. .removeListener(eventName, callback) → Stop a specific listener
5. Multiple listeners can exist for the same event
*/

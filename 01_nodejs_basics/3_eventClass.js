/*
====================================================
📢 EVENTEMITTER CLASS EXAMPLE IN NODE.JS
====================================================

WHAT IS HAPPENING?
- We are creating our own Chat class that can send and receive messages using events.
- The Chat class extends Node.js's EventEmitter class so it can use .on() and .emit().
- We listen for an event ("messageReceived") and trigger it when a message is sent.
====================================================
*/

// 1️⃣ Import the built-in EventEmitter class from 'events' module
const EventEmitter = require("events");

/*
2️⃣ Create a custom class Chat that extends EventEmitter
   - Extending means Chat inherits all EventEmitter methods (like .on(), .emit(), etc.).
*/
class Chat extends EventEmitter {
    /*
    📩 sendMessage method:
    - Takes a message as an argument
    - Logs that the message was sent
    - Emits (triggers) the "messageReceived" event so all listeners can react
    */
    sendMessage(msg) {
        console.log(`Message Sent: ${msg}`);
        /*
        🎯 this.emit(eventName, data)
        - "eventName" → name of the event to trigger
        - "data" → any value passed to the listener callback
        */
        this.emit('messageReceived', msg);
    }
}

// 3️⃣ Create an instance of Chat class
const chat = new Chat();

/*
4️⃣ Listen for the "messageReceived" event
    - .on(eventName, callback) → registers a listener
    - Whenever the event is emitted, the callback runs
*/
chat.on("messageReceived", (msg) => {
    console.log(`New Message: ${msg}`);
});

/*
5️⃣ Call sendMessage
    - This logs "Message Sent: ..."
    - Then it emits "messageReceived"
    - The listener above reacts and logs "New Message: ..."
*/
chat.sendMessage("Hello Sayan");

/*
====================================================
🧠 FLOW OF EXECUTION
----------------------------------------------------
1. chat.sendMessage("Hello Sayan") is called
2. Logs: "Message Sent: Hello Sayan"
3. Emits the "messageReceived" event with the msg
4. chat.on("messageReceived", ...) listener catches it
5. Logs: "New Message: Hello Sayan"

====================================================
💡 INTERVIEW NOTES:
----------------------------------------------------
- EventEmitter allows custom communication between different parts of an app.
- Inheritance from EventEmitter is common when building reusable classes.
- .on() → Listen for events (multiple calls possible)
- .once() → Listen only for the first time event happens
- .emit() → Trigger an event and optionally send data
====================================================
*/

/*
====================================================
🚀 NODE.JS BASICS
====================================================

📝 WHAT IS NODE.JS?
- Node.js is a **runtime environment** that lets you run JavaScript outside the browser.
- Built on Chrome's V8 JavaScript engine.
- Great for building **servers, APIs, and CLI tools**.
- Single-threaded but uses an event-driven, non-blocking I/O model → handles many requests efficiently.

----------------------------------------------------
🛠 WHY NODE?
- Fast execution (V8 engine).
- Non-blocking async code → handles thousands of requests at once.
- Huge ecosystem via npm.
- Perfect for APIs, real-time apps, microservices.

----------------------------------------------------
📦 WHAT IS NPM?
- Stands for Node Package Manager.
- Default package manager for Node.js.
- Lets you install, share, and manage code packages (libraries).

----------------------------------------------------
📄 package.json
- A config file for your project.
- Stores:
  → Project name, version, description
  → Scripts (commands you can run)
  → Dependencies (packages your app needs)
  → Dev dependencies (packages for development only)

📄 package-lock.json
- Automatically generated when npm installs packages.
- Stores exact version numbers of dependencies.
- Ensures the project installs the **same package versions** on all systems (important for teams).

----------------------------------------------------
🔹 MODULES IN NODE
- Modules = small reusable pieces of code.
- Types:
    1. Built-in modules (fs, path, http, os, etc.)
    2. Local modules (files you create)
    3. Third-party modules (via npm)

- CommonJS syntax (default in Node):
    → require() to import
    → module.exports to export
- ES Module syntax (newer):
    → import/export keywords (needs `"type": "module"` in package.json)

====================================================
*/


// ----------------------------------------------
// 1️⃣ BUILT-IN MODULE EXAMPLE
// ----------------------------------------------
const os = require("os"); // importing a core module

console.log("Operating System Info:");
console.log("Platform:", os.platform()); // win32, linux, etc.
console.log("Architecture:", os.arch()); // x64, arm, etc.
console.log("CPU Count:", os.cpus().length); // number of CPU cores


// ----------------------------------------------
// 2️⃣ LOCAL MODULE EXAMPLE
// ----------------------------------------------
// 👉 Create a file called myModule.js with:
// module.exports = {
//   sayHello: function(name) {
//     return `Hello, ${name}!`;
//   }
// };

// Then import & use it:
const myModule = require("./myModule"); // './' means local file
console.log(myModule.sayHello("Sayan"));


// ----------------------------------------------
// 3️⃣ THIRD-PARTY MODULE EXAMPLE
// ----------------------------------------------
// 1. Install using: npm install chalk
// 2. Use it:
const chalk = require("chalk");

console.log(chalk.green("This text is green!"));
console.log(chalk.bgBlue.white("Blue background, white text"));


// ----------------------------------------------
// 4️⃣ CREATING package.json
// ----------------------------------------------
// Run in terminal: npm init -y
// This creates package.json with default values
// "dependencies" appear after installing packages
// e.g., npm install express → adds express in package.json


// ----------------------------------------------
// 5️⃣ package-lock.json
// ----------------------------------------------
// Created automatically → DO NOT edit manually
// Locks the versions of dependencies
// Ensures consistent installs across machines

/*
====================================================
💡 INTERVIEW QUESTIONS:
----------------------------------------------------
Q1: Is Node.js single-threaded?
A: Yes for JavaScript execution, but uses worker threads & libuv under the hood for async I/O.

Q2: Difference between dependencies and devDependencies?
A: dependencies → needed in production
   devDependencies → only needed in development

Q3: Can we use ES6 import/export in Node?
A: Yes, if you set `"type": "module"` in package.json or use .mjs files.

Q4: Difference between package.json and package-lock.json?
A: package.json → high-level info & loose version rules
   package-lock.json → exact dependency versions

Q5: Types of modules in Node.js?
A: Built-in, Local, Third-party
====================================================
*/

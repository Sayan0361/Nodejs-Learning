/*
====================================================
📂 FS MODULE (File System) in Node.js
====================================================

📝 WHAT IS IT?
- Built-in Node.js module for interacting with the file system.
- Lets you create, read, update, delete, and rename files.
- Supports both **Synchronous** and **Asynchronous** methods.

⚠️ IMPORTANT:
- Sync methods block the event loop (execution waits until task finishes).
- Async methods take a callback or return a Promise (non-blocking).

====================================================
METHODS CATEGORIES:
----------------------------------------------------
1️⃣ READING FILES → fs.readFile / fs.readFileSync
2️⃣ WRITING FILES → fs.writeFile / fs.writeFileSync
3️⃣ APPENDING DATA → fs.appendFile / fs.appendFileSync
4️⃣ RENAMING FILES → fs.rename / fs.renameSync
5️⃣ DELETING FILES → fs.unlink / fs.unlinkSync
6️⃣ WORKING WITH DIRECTORIES → fs.mkdir, fs.rmdir, fs.readdir
7️⃣ CHECKING FILES → fs.stat
8️⃣ PROMISES API → require('fs').promises

====================================================
*/

const fs = require("fs"); // Import core 'fs' module

// -------------------------------------------------
// 1️⃣ READING A FILE (ASYNC)
// -------------------------------------------------
fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File content (async):", data);
});

// 1.1 READING A FILE (SYNC) - blocking
try {
    const dataSync = fs.readFileSync("example.txt", "utf8");
    console.log("File content (sync):", dataSync);
} catch (err) {
    console.error("Error reading file:", err);
}


// -------------------------------------------------
// 2️⃣ WRITING TO A FILE (ASYNC) - Creates or overwrites
// -------------------------------------------------
fs.writeFile("example.txt", "Hello from Node.js!", (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return;
    }
    console.log("File written successfully (async)");
});

// 2.1 WRITING TO A FILE (SYNC)
try {
    fs.writeFileSync("example-sync.txt", "Sync write example");
    console.log("File written successfully (sync)");
} catch (err) {
    console.error("Error writing file:", err);
}


// -------------------------------------------------
// 3️⃣ APPENDING DATA
// -------------------------------------------------
fs.appendFile("example.txt", "\nAppended line!", (err) => {
    if (err) throw err;
    console.log("Data appended successfully");
});


// -------------------------------------------------
// 4️⃣ RENAMING A FILE
// -------------------------------------------------
fs.rename("example-sync.txt", "renamed-file.txt", (err) => {
    if (err) throw err;
    console.log("File renamed successfully");
});


// -------------------------------------------------
// 5️⃣ DELETING A FILE
// -------------------------------------------------
fs.unlink("renamed-file.txt", (err) => {
    if (err) throw err;
    console.log("File deleted successfully");
});


// -------------------------------------------------
// 6️⃣ WORKING WITH DIRECTORIES
// -------------------------------------------------
// CREATE A DIRECTORY
fs.mkdir("myFolder", (err) => {
    if (err) throw err;
    console.log("Folder created successfully");
});

// READ DIRECTORY CONTENTS
fs.readdir(".", (err, files) => {
    if (err) throw err;
    console.log("Directory files:", files);
});

// REMOVE DIRECTORY
fs.rmdir("myFolder", (err) => {
    if (err) throw err;
    console.log("Folder removed successfully");
});


// -------------------------------------------------
// 7️⃣ CHECKING FILE INFO
// -------------------------------------------------
fs.stat("example.txt", (err, stats) => {
    if (err) throw err;
    console.log("Is file:", stats.isFile());
    console.log("Size in bytes:", stats.size);
});


// -------------------------------------------------
// 8️⃣ FS PROMISES API (Modern way)
// -------------------------------------------------
const fsp = require("fs").promises;

async function fileOps() {
    try {
        await fsp.writeFile("promiseFile.txt", "Created with Promises API");
        let content = await fsp.readFile("promiseFile.txt", "utf8");
        console.log("Promise file content:", content);
        await fsp.unlink("promiseFile.txt");
        console.log("Promise file deleted");
    } catch (err) {
        console.error("Error with promises API:", err);
    }
}
fileOps();


/*
====================================================
💡 INTERVIEW QUESTIONS:
----------------------------------------------------
Q1: Difference between fs.readFile and fs.readFileSync?
A: readFile → async (non-blocking)
   readFileSync → sync (blocking)

Q2: Which is better for large files?
A: fs.createReadStream (streams) → avoids loading entire file into memory.

Q3: What's the default encoding?
A: By default, fs methods return a Buffer. Pass "utf8" to get a string.

Q4: Can fs work with Promises?
A: Yes, via require('fs').promises.

Q5: What happens if you call writeFile on an existing file?
A: It overwrites the content unless you use flags to append.

====================================================
*/

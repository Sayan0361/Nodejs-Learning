/*
====================================================
📚 Throttling & Debouncing in JavaScript
====================================================

📝 WHY WE NEED THEM:
- When events are triggered many times in a short period (scroll, resize, typing),
  calling the event handler each time can cause performance issues.
- Throttling and Debouncing are performance optimization techniques to control how often a function is executed.

----------------------------------------------------
🔹 DEBOUNCING:
- Waits until the user stops doing something, then runs the function.
- Resets its timer on each trigger.
- Example: Search bar suggestions → Run only after typing has stopped for 500ms.

🔹 THROTTLING:
- Executes a function at most once every X milliseconds, no matter how many times it's triggered.
- Ignores extra triggers during the cooldown period.
- Example: Scroll event → Update UI only once every 200ms.

----------------------------------------------------
📌 INTERVIEW TIPS:
Q1: When to use debounce?
A: When you want the action to happen only after the user has stopped triggering events (typing search queries).

Q2: When to use throttle?
A: When you want the action to happen at regular intervals during continuous events (scrolling, window resizing).

Q3: Main difference?
A: Debounce delays execution until activity stops; throttle enforces a maximum execution rate.

Q4: Are they async?
A: They use setTimeout (async) internally to manage delays.
*/


// ----------------------------------------------
// A simple heavy operation simulator
function logMessage(msg) {
    console.log(`${msg} at ${new Date().toLocaleTimeString()}`);
}

// ----------------------------------------------
// 1️⃣ Debounce Implementation
// ----------------------------------------------
/*
HOW IT WORKS:
- Returns a function that waits for `delay` ms before executing `fn`.
- If called again before `delay` finishes, it cancels the previous timer.
*/
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer); // cancel previous pending execution
        timer = setTimeout(() => {
            fn.apply(this, args); // run after delay
        }, delay);
    };
}

// Example: Search box simulation
const debouncedSearch = debounce(() => logMessage("Debounced Search"), 1000);

// Simulate typing every 300ms (user stops after 2 seconds)
let typingInterval = setInterval(() => debouncedSearch(), 300);
setTimeout(() => clearInterval(typingInterval), 2000); // stop typing


// ----------------------------------------------
// 2️⃣ Throttle Implementation
// ----------------------------------------------
/*
HOW IT WORKS:
- Allows function to execute once, then ignores calls until `limit` ms has passed.
*/
function throttle(fn, limit) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args); // run immediately
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit); // reset after limit
        }
    };
}

// Example: Scroll simulation
const throttledScroll = throttle(() => logMessage("Throttled Scroll"), 1000);

// Simulate continuous scroll every 200ms (stop after 5 seconds)
let scrollInterval = setInterval(() => throttledScroll(), 200);
setTimeout(() => clearInterval(scrollInterval), 5000);


/*
====================================================
TIMELINE VISUALIZATION:
====================================================
Assume a user triggers events every 200ms.

Debounce (delay = 1000ms):
Event: |A|B|C|D|.............(stop).......|RUN|
- Only runs ONCE, after the user stops for 1 sec.

Throttle (limit = 1000ms):
Event: |RUN|X|X|X|RUN|X|X|X|RUN|...
- Runs immediately, then every 1 sec during activity.

====================================================
END OF FILE
====================================================
*/

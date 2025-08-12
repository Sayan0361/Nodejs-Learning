/*
====================================================
📌 HTTP Methods with Axios & Fetch
====================================================

HTTP METHODS:
-------------
GET    → Retrieve data from the server
POST   → Send new data to the server
PUT    → Update existing data (replace fully)
PATCH  → Update existing data (partial update)
DELETE → Remove data from the server

We'll use the public test API: https://jsonplaceholder.typicode.com

====================================================
1️⃣ FETCH — All Methods
====================================================
*/

// GET
async function fetchGET() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    console.log("📄 FETCH GET:", data);
}
fetchGET();

// POST
async function fetchPOST() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Post", body: "Hello World", userId: 1 })
    });
    const data = await res.json();
    console.log("📄 FETCH POST:", data);
}
fetchPOST();

// PUT
async function fetchPUT() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 1, title: "Updated Post", body: "Updated Content", userId: 1 })
    });
    const data = await res.json();
    console.log("📄 FETCH PUT:", data);
}
fetchPUT();

// PATCH
async function fetchPATCH() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Partially Updated Title" })
    });
    const data = await res.json();
    console.log("📄 FETCH PATCH:", data);
}
fetchPATCH();

// DELETE
async function fetchDELETE() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "DELETE" });
    console.log("📄 FETCH DELETE:", res.status); // usually 200 or 204
}
fetchDELETE();



/*
====================================================
2️⃣ AXIOS — All Methods
====================================================
*/
const axios = require("axios");

// GET
async function axiosGET() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log("📄 AXIOS GET:", res.data);
}
axiosGET();

// POST
async function axiosPOST() {
    const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: "New Axios Post",
        body: "Hello Axios",
        userId: 1
    });
    console.log("📄 AXIOS POST:", res.data);
}
axiosPOST();

// PUT
async function axiosPUT() {
    const res = await axios.put("https://jsonplaceholder.typicode.com/posts/1", {
        id: 1,
        title: "Axios Updated Post",
        body: "Axios Updated Content",
        userId: 1
    });
    console.log("📄 AXIOS PUT:", res.data);
}
axiosPUT();

// PATCH
async function axiosPATCH() {
    const res = await axios.patch("https://jsonplaceholder.typicode.com/posts/1", {
        title: "Axios Partially Updated Title"
    });
    console.log("📄 AXIOS PATCH:", res.data);
}
axiosPATCH();

// DELETE
async function axiosDELETE() {
    const res = await axios.delete("https://jsonplaceholder.typicode.com/posts/1");
    console.log("📄 AXIOS DELETE:", res.status); // usually 200 or 204
}
axiosDELETE();



/*
====================================================
📌 INTERVIEW TIPS:
====================================================

Q1: Difference between PUT and PATCH?
A: PUT replaces the entire resource, PATCH updates only specific fields.

Q2: Does Fetch reject for HTTP errors like 404?
A: No, Fetch only rejects for network errors. Must check res.ok.

Q3: Why use Axios for DELETE requests instead of Fetch?
A: Both work fine; Axios handles some edge cases (headers, timeouts) more easily.

Q4: Which method should you use for sending form data?
A: POST (with FormData) or PUT/PATCH depending on update type.

Q5: Can we send query params in Axios GET?
A: Yes → axios.get(url, { params: { key: value } })
*/

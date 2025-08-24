// Importing dependencies
import express from "express"; // Express for building routes (signup/signin APIs)
import db from "../db/index.js"; // Our DB instance (configured with Drizzle ORM)
import { userSessions, usersTable } from "../db/schema.js"; // Tables defined in schema
import { eq } from "drizzle-orm"; // For writing conditions like WHERE email = something
import { randomBytes, createHmac } from "node:crypto"; // For password hashing & salt

// Create an Express Router (to define routes separately)
const router = express.Router();

// Just a placeholder GET route (currently does nothing)
router.get("/");

// ---------------- SIGNUP ROUTE ------------------
router.post("/signup", async (req, res) => {
    // Grab user input from request body
    const { name, email, password } = req.body;

    // Step 1: Check if user already exists
    const [existingUser] = await db
        .select({
            email: usersTable.email, // only fetch the email column
        })
        .from(usersTable)
        .where((table) => eq(table.email, email)); // WHERE email = input email

    if (existingUser) {
        // If email already exists → return error
        return res.status(400).json({
            error: `user with email ${email} already exists`,
        });
    }

    // Step 2: If new user → hash the password
    const salt = randomBytes(256).toString("hex"); // Generate random salt
    const hashedPassword = createHmac("sha256", salt) // Hashing algo = SHA-256
        .update(password) // hash the raw password
        .digest("hex"); // convert to hex string

    // Step 3: Insert new user into DB
    const [user] = await db
        .insert(usersTable)
        .values({
            name,
            email,
            password: hashedPassword,
            salt,
        })
        .returning({
            id: usersTable.id, // return only user id after insert
        });

    // Step 4: Send success response
    return res.status(201).json({
        status: "success",
        data: {
            userId: user.id, // return new user’s id
        },
    });
});

// ---------------- SIGNIN ROUTE ------------------
router.post("/signin", async (req, res) => {
    // Grab login input
    const { email, password } = req.body;

    // Step 1: Check if user exists in DB
    const [existingUser] = await db
        .select({
            id: usersTable.id,
            email: usersTable.email,
            salt: usersTable.salt,
            password: usersTable.password,
        })
        .from(usersTable)
        .where((table) => eq(table.email, email)); // WHERE email = input email

    if (!existingUser) {
        // If not found → error
        return res.status(404).json({
            error: `user with email ${email} doesnt exists`,
        });
    }

    // Step 2: Verify password
    const salt = existingUser.salt; // get saved salt
    const existingHash = existingUser.password; // get saved hash

    // Hash the incoming password with same salt
    const newHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    // Compare hashes → if mismatch → wrong password
    if (newHash !== existingHash) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    // Step 3: If password matches → create session
    const [session] = await db
        .insert(userSessions)
        .values({
            userId: existingUser.id,
        })
        .returning({
            id: userSessions.id,
        });

    // Step 4: Send session id back
    return res.json({
        status: "successfully logged in",
        sessionId: session.id,
    });
});

// Export this router to use in your main server.js/app.js
export default router;

const express = require("express")
const authorsTable = require("../models/author.model.js")
const db = require("../db");
const auth = require("../middlewares/auth.js");
const booksTable = require("../models/book.model.js")
const {eq,ilike,sql} = require("drizzle-orm")

const router = express.Router();

router.get("/getAllAuthors", async(req,res)=>{
    const authors = await db.select().from(authorsTable);
    return res.json(authors);
})

router.get("/:id", async(req,res)=>{
    const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id,req.params.id));

    if(!author){
        return res.status(404).json({
            error:"No such author found"
        })
    }
    return res.json(author);
})

router.post("/add",async(req,res)=>{
    const {firstName,lastName,email} = req.body;
    const [author] = await db.insert(authorsTable).values({
        firstName,
        lastName,
        email
    }).returning({id:authorsTable.id});

    return res.json({message:"Author has been created",id:author.id});
})

router.get("/:id/books", async(req,res)=>{
    const books = await db.select().from(booksTable).where(eq(booksTable.authorId,req.params.id));
    return res.json(books);
})





module.exports = router;
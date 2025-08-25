// controllers/userController.js
// ------------------------------
// The "Controller" connects Model and View.
// It receives requests, uses model functions, and returns responses.

const db = require("../db")
const booksTable = require("../models/book.model.js")
const {eq,ilike,sql} = require("drizzle-orm")

// GET all books
const getAllBooks = async (req, res, next) => {
  try {
    const search = req.query.search;

    if (search) {
      // const books = await db
      //   .select()
      //   .from(booksTable)
      //   .where(
      //     sql`to_tsvector('english', ${booksTable.title}) @@ plainto_tsquery('english', ${search})`
      //   );
      const books = await db
                      .select()
                      .from(booksTable)
                      .where(ilike(booksTable.title, `%${search}%`));

      return res.json(books);  // ✅ stop here
    }

    const [books] = await db.select().from(booksTable);
    return res.json(books);     // ✅ stop here
  } catch (err) {
    next(err); // ✅ let your errorHandler middleware handle errors
  }
};

// GET a single book by id
const getBook = async(req, res) => {
  const id = req.params.id;
  const [book] = await db.select().from(booksTable).where((table)=>eq(table.id,id)).limit(1);

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
};

// POST create book
const createBook = async(req, res) => {
  const { title,description,authorId } = req.body;

  if(!title || !authorId) return res.status(400).json({error:"Title and authorId required. Pls check u missed something"});

  const [newBook] = await db.insert(booksTable).values({
    title,
    description,
    authorId
  }).returning({
    id:booksTable.id
  });

  res.status(201).json({message:"Book created successfully", id:newBook.id});
};

// Delete a book
const deleteBookById = async(req,res)=>{
  const id = req.params.id;
  await db.delete(booksTable).where(eq(booksTable.id,id))

  return res.status(200).json({
    message:"Book got deleted. Why would u do that?"
  })
}

module.exports = { getBook,getAllBooks,createBook,deleteBookById };

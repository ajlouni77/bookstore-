const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "book_catalog",
  password: "your_password",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Book Catalog API is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//انشاء كتاب جديد//
app.post("/books", async (req, res) => {
  const { title, author, genre, publication_date, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO books (title, author, genre, publication_date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author, genre, publication_date, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//انشاء كتاب جديد//

//جلب جميع الكتب//
app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//جلب جميع الكتب//

//تحديث كتاب //
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_date, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE books SET title=$1, author=$2, genre=$3, publication_date=$4, description=$5 WHERE id=$6 RETURNING *",
      [title, author, genre, publication_date, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//تحديث كتاب //

//حذف كتاب//
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM books WHERE id=$1", [id]);
    res.json({ message: "Book deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
//حذف كتاب//

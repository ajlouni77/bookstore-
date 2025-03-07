import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container">
      <h1>Book Catalog</h1>
      <Link to="/add">➕ Add New Book</Link>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <Link to={`/edit/${book.id}`}>✏️ Edit</Link>
            <button onClick={() => handleDelete(book.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

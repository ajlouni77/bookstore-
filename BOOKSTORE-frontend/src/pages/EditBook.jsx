import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) => console.error("Error fetching book:", error));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${id}`, book);
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        value={book.author}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="genre"
        value={book.genre}
        onChange={handleChange}
      />
      <input
        type="date"
        name="publication_date"
        value={book.publication_date}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={book.description}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Update Book</button>
    </form>
  );
};

export default EditBook;

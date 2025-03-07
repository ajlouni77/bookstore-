import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/books", book);
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        onChange={handleChange}
      />
      <input type="date" name="publication_date" onChange={handleChange} />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      ></textarea>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;

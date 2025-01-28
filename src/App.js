import React, { useState, useEffect, use } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import "./App.css"

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/fiction.json?limit=10")
      .then((response) => response.json()) // convert the response to json
      //.then((data) => setBooks(data.works || []))
      .then((data) => {
        const booksWithCovers = data.works.map((book) => ({
          ...book,
          coverUrl: book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
            : null,
        }));
        setBooks(booksWithCovers);
      })
      .catch((error) => console.error("Error fetching books: ", error)); // setBooks is a function that will update the books state
  }, []);

  const addBook = (newBook) => {
    setBooks([...books, newBook]); // add the new book to the books state
  };

  const updateBook = (updatedBook) => {
    setBooks(
      books.map((book) => (book.key === updatedBook.key ? updatedBook : book))// update the book with the same key
    );
    setEditingBook(null); // reset the editing state
  };

  const deleteBook = (bookKey) => {
    setBooks(books.filter((book) => book.key !== bookKey)); // remove the book with the given key
  };

  return (
    <div className='container'>
      <h1 className='text'>Library App</h1>
      <BookForm
        onAddBook={addBook}
        onUpdate={updateBook}
        editingBook={editingBook}
      />
      <BookList
        books={books}
        onEditBook={setEditingBook}
        onDeleteBook={deleteBook}
      />
    </div>
  )
}

export default App;

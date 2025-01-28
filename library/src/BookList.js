import React from 'react';

function BookList({ books, onEditBook, onDeleteBook }) {
    return (
        <div>
            <h2 className='text1'>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.key} className='text2'>
                        {book.coverUrl && <img src={book.coverUrl} alt={book.title} />}
                        {book.title} by {book.authors?.[0]?.name || 'Unknown Author'}
                        <button onClick={() => onEditBook(book)}>Edit</button>
                        <button onClick={() => onDeleteBook(book.key)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
import React, { useState, useEffect } from 'react';

function BookForm({ onAddBook, onUpdate, editingBook }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title || ''); // set the title to the editing book's title
            setAuthor(editingBook.authors?.[0]?.name || ''); // set the author to the editing book's author
        } else {
            setTitle('');
            setAuthor('');
        }
    }, [editingBook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBook) {
            onUpdate({
                ...editingBook,
                title,
                authors: [{ name: author }]
            }); // update the editing book with the new title and author
        } else {
            onAddBook({
                key: Date.now().toString(), // generate a unique key
                title,
                authors: [{ name: author }],
            });
        }
        setTitle('');
        setAuthor('');
    };
    return (
        <form onSubmit={handleSubmit} className='text3'>
            <h2 className='text2'>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
            <div className='text4'>
                <label className='text5'>Title</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='text6'
                    required
                />
            </div>
            <div className='text7'>
                <label className='text8'>Author</label>
                <input
                    type='text'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className='text9'
                    required
                />
            </div>
            <button type='submit' className='text10'>
                {editingBook ? 'Update Book' : 'Add Book'}
            </button>
        </form>
    );
};

export default BookForm;

import axios from "axios";
import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get("http://localhost:3001/books");

        setBooks(response.data);
    };

    // Don't Do This
    // fetchBooks();

    useEffect(() => {
        fetchBooks();
    }, []);

    const updateBookById = async(id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, { 
            title: newTitle 
        });

        const updatedBooks = books.map((book) => {
            if(book.id === id) {
                return { ...book, ...response.data };
            };

            return book;
        });

        setBooks(updatedBooks);
    };

    const deleteBookById = async(id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
        
        const updatedBooks = books.filter((book) => {
            return book.id !== id
        });
        setBooks(updatedBooks);
    };

    const createBook = async(title) => {
        // BAD CODE!
        // books.push({ id: 123, title: title });
        // console.log(books);

        const response = await axios.post("http://localhost:3001/books", { 
            title
        });

        const updatedBooks = [
            ...books, 
            response.data
        ];
        setBooks(updatedBooks);        
    };
    
    return( 
    <div className="app">
        <h1>Reading List</h1>
        <BookList onEdit={updateBookById} books={books} onDelete={deleteBookById} />
        <BookCreate onCreate={createBook} />
    </div>
    );
}

export default App;
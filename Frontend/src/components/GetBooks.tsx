import React, { useState } from 'react';
import "./GetBooks.css"

type Book = {
    title: string;
    author: string;
    cover: string;
    authorBio: string;
    publishYear: number;
    genre: string;
    description: string;
    review: string;
  };
  

import { Link } from 'react-router-dom';

const BookSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const getBooks = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);
  
    try {
      const response = await fetch(`http://openlibrary.org/search.json?q=${inputValue}`);
      const data = await response.json();
  
      const fetchedBooks = await Promise.all(
        data.docs.map(async (doc: { cover_i: any; author_key: any[]; title: any; author_name: any[]; first_publish_year: any; subject: any[]; description: any; review: any; }) => {
          if (doc.cover_i) {
            const authorKey = doc.author_key?.[0];
            if (!authorKey) return null; // Skip if author key is undefined
  
            const authorResponse = await fetch(`http://openlibrary.org/authors/${authorKey}.json`);
            const authorData = await authorResponse.json();
            const authorBio = authorData.bio || 'Not available';
  
            return {
              title: doc.title,
              author: doc.author_name?.[0],
              cover: `http://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
              authorBio: authorBio,
              publishYear: doc.first_publish_year,
              genre: doc.subject?.slice(0, 5).join(', ') || 'Not available',
              description: doc.description || 'Not available',
              review: doc.review || 'Not available',
            };
          }
        })
      );
  
      setBooks(fetchedBooks.filter(Boolean)); // Filter out undefined values
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  
  

  const handleAddBook = (book: Book) => {
    addBook(
      book.title,
      book.author,
      book.authorBio,
      book.publishYear,
      book.description,
      book.review,
      book.cover,
      book.genre
    );
  };

  const addBook = async (
    title: string,
    author: string,
    authorBio: string,
    publishYear: number,
    description: string,
    review: string,
    cover: string,
    genre: string
  ) => {
    try {
      const response = await fetch('http://localhost:3001/api/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          authorBio,
          publishYear,
          description,
          review,
          cover,
          genre,
        }),
      });

      if (response.ok) {
        console.log('Book added successfully');
      } else {
        console.error('Error adding book:', response.statusText);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding book:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };


  return (
    <div>

{/* <div className="search">
  <form className="search-form">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search for books, authors, categories and more.."
    />
    <input type="submit" onClick={getBooks} defaultValue="Submit" />
  </form>
</div> */}

<div className="search__container">
    <p className="search__title">Go ahead, hover over Search for books, authors, categories and more..</p>
    <input className="search__input" 
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    placeholder="Search for books"
    
    />
  </div>
  <button onClick={getBooks} className='button_container'>
  Search
    <div className="arrow-wrapper">
        <div className="arrow"></div>

    </div>
</button>
  <div className="credits__container">
  
  </div>


<Link to="/books">
<button className="button_container">View Library</button>
</Link>

    <div className="main">
      {/* Use the fetched books to generate cards */}

      {loading ? (
        <div className='loader_main'>

            <span className="loader"></span>
        </div>
        ) : (
      <ul className="cards">
        {books.map((book, index) => (
          <li className="cards_item" key={index}>
            <div className="card">
              <div className="card_image">
              <img src={book.cover}  alt="Book Cover" />
              </div>
              <div className="card_content">
                <h2 className="card_title">{book.title}</h2>
                <br />
            Author Bio: {book.authorBio}
            <br />
            Publication Date: {book.publishYear}
            <br />
            Genre: {book.genre}
            <br />
            Description: {book.description}
            <br />
            Review: {book.review}
            <br />
            <div className="rating">Rate this book:</div>
            <br />
            <button className="btn card_btn" onClick={() => handleAddBook(book)}>
                      Add to Library
                    </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
        )}  
      
    </div>
    <h3 className="made_by">Made with ♡</h3>
  </div>
  );
};

export default BookSearch;

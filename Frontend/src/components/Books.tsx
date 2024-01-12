import React, { useState, useEffect } from 'react';
import './Books.css';
import './Search.css'

type Book = {
  title: string;
  author: string;
  cover: string;
  authorBio: string;
  publishYear: number;
  genre: string;
  description: string;
  review: string;
  error: string;
};

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/get');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBooks(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching data:', error.message);
        } else {
          console.error('An unknown error occurred:', error);
        }
      }
    };

    fetchData();
  }, []); 


  return (
    <>
   <div className="seven">
  <h1>My Team </h1>
</div>
   
    <ul className="cards">
      {books.map((book, index) => (
        <li className="cards_item" key={index}>
          <div className="card">
            <div className="card_image">
              <img src={book.cover} alt="Book Cover" />
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
            </div>
          </div>
        </li>
      ))}
    </ul>
    </>
  );
};

export default Books;

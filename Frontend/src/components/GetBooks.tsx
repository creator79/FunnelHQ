import React, { useState } from 'react';
import "./Dummy.css"

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
  



const BookSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const getBooks = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(`http://openlibrary.org/search.json?q=${inputValue}`);
      const data = await response.json();
  
      const fetchedBooks = await Promise.all(
        data.docs.map(async (doc) => {
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
  
  

  const addBook = (title, author, authorBio, publishYear, description, review, cover, genre) => {
    // Implement the logic to add the book to your desired state or perform any other action
    console.log('Adding book:', title, author, authorBio, publishYear, description, review, cover, genre);
  };

  return (
    <div>

<div className="search">
  <form className="search-form">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search for books, authors, categories and more.."
    />
    <input type="submit" onClick={getBooks} defaultValue="Submit" />
  </form>
</div>













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
                <button
                  className="btn card_btn"
                  onClick={() =>
                    addBook(
                      book.title,
                      book.author,
                      book.authorBio,
                      book.publishYear,
                      book.description,
                      book.review,
                      book.cover,
                      book.genre
                    )
                  }
                >
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

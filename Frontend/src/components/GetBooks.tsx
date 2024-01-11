import React, { useState } from 'react';

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

  const getBooks = () => {
    // Perform the fetch and data processing logic here
    fetch(`http://openlibrary.org/search.json?q=${inputValue}`)
      .then((response) => response.json())
      .then((response) => {
        const fetchedBooks: ((prevState: never[]) => never[]) | { title: any; author: any; cover: string; authorBio: any; publishYear: any; genre: any; description: any; review: any; }[] = [];

        for (let i = 0; i < response.docs.length; i++) {
          if (response.docs[i].cover_i) {
            const authorKey = response.docs[i].author_key[0];

            fetch(`http://openlibrary.org/authors/${authorKey}.json`)
              .then((authorResponse) => authorResponse.json())
              .then((authorResponse) => {
                const authorBio = authorResponse.bio || 'Not available';

                fetchedBooks.push({
                  title: response.docs[i].title,
                  author: response.docs[i].author_name[0],
                  cover: `http://covers.openlibrary.org/b/id/${response.docs[i].cover_i}-M.jpg`,
                  authorBio: authorBio,
                  publishYear: response.docs[i].first_publish_year,
                  genre: response.docs[i].subject.slice(0, 5).join(', '),
                  description: response.docs[i].description || 'Not available',
                  review: response.docs[i].review || 'Not available',
                });

                setBooks(fetchedBooks);
              });
          }
        }
      });
  };

  const addBook = (title, author, authorBio, publishYear, description, review, cover, genre) => {
    // Implement the logic to add the book to your desired state or perform any other action
    console.log('Adding book:', title, author, authorBio, publishYear, description, review, cover, genre);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter book title"
      />
      <button onClick={getBooks}>Search</button>

      <div id="output">
        {books.map((book, index) => (
          <div key={index}>
            <h2>{book.title}</h2>
            Author: {book.author}
            <br />
            <img src={book.cover} style={{ height: '300px', width: '200px' }} alt="Book Cover" />
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
              className="button1"
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
              <span>Add Book</span>
            </button>
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;

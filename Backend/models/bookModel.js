import queryAsync from '../utils/dbError.js';
import db from '../utils/database.js'

const BookModel = {
    getAllBooks: async () => {
        const sql = 'SELECT * FROM books';
        return db.queryAsync(sql);
    },
    addBook: async (values) => {
        const sql = `INSERT INTO books (title, author, authorBio, publishYear, description, review, cover, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        return db.queryAsync(sql, values);
    },
};


export default BookModel;

import BookModel from '../models/bookModel.js';

const BookController = {
    getBooks: async (req, res) => {
        try {
            const books = await BookModel.getAllBooks();
            if (books.length > 0) {
                res.status(200).json(books);
            } else {
                res.status(404).json({ error: 'No books found' });
            }
        } catch (error) {
            console.error('Error fetching books from database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    addBook: async (req, res) => {
        try {
            const {
                title,
                author,
                authorBio,
                publishYear,
                description,
                review,
                cover,
                genre,
            } = req.body;

            const values = [
                title, author, authorBio, publishYear, description, review, cover, genre
            ];

            await BookModel.addBook(values);
            console.log('Book added to database');
            res.status(200).send('Book added to database');
        } catch (error) {
            console.error('Error inserting book into database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

export default BookController;

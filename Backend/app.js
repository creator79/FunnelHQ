import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import userRouter from './routes/user.router.js';


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes

app.use('/api/v1', bookRoutes);
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

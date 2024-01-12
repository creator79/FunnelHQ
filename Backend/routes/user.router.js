// user.router.js
import { createUsers, getUsers, updateUsers, deleteUsers, login , register } from '../controllers/user.controller.js';
import authenticateToken from '../middlewares/authenticationMiddleware.js'; // Change this line

import express from 'express';
const router = express.Router();

router.post('/', createUsers);
router.get('/',authenticateToken, getUsers);
router.put('/', authenticateToken, updateUsers);
router.delete('/',authenticateToken, deleteUsers);
router.post('/login', login);
router.post('/register', register);


export default router;

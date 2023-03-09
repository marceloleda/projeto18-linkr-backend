import express from 'express';
import { getUsers, rank } from '../controllers/users.controller.js';
import { validateToken } from '../middlewares/validateToken.middleware.js';
import router from './auth.router.js';

const router = express.Router();

router.get('/users/me', validateToken, getUsers);
router.get('/ranking', rank);


export default router;
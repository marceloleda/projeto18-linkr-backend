import express from 'express';
import { getUsers, rank } from '../controllers/user.controller.js';
import { validateToken } from '../middlewares/validateToken.middleware.js';
const router = express.Router();

router.get('/users/me', validateToken, getUsers);
router.get('/ranking', rank);


export default router;
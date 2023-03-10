import express from 'express';
import { createPost, getPosts } from '../controllers/timeLine.controller.js';

const router = express.Router();

router.get('/timeline', getPosts)
router.post('/timeline', createPost)

export default router;
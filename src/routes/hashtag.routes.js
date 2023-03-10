import express from 'express';
import { list, show } from '../controllers/hashtag.controller';

const router = express.Router();

router.get('/hashtags/:limit?', list);
router.get('/hashtags/:id', show);

export default router;

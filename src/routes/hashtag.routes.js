import express from 'express';
import { list, show } from '../controllers/hashtag.controller';

const hashRouter = express.Router();

hashRouter.get('/hashtags/:limit?', list);
hashRouter.get('/hashtags/:id', show);

export default hashRouter;

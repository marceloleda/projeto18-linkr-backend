import { Router } from 'express';
import { createPost, getPosts } from '../controllers/timeLine.controller.js';
import { authentication } from '../middlewares/jwt.middleware.js';

const postsRouter = Router();

postsRouter.get("/timeline", getPosts);
postsRouter.post("/timeline", createPost);
postsRouter.put("/timeline", );
postsRouter.delete("/timeline/:id", );

export default postsRouter;
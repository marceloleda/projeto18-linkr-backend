import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postsRouter from './routes/posts.routes.js';
import userRouter from './routes/user.routes.js';
import hashRouter from './routes/hashtag.routes.js';
import authRouter from './routes/auth.routes.js';
import likesRouter from './routes/likes.routes.js';

dotenv.config()

const api = express();
api.use(cors())
api.use(express.json())

api.use([authRouter, postsRouter, userRouter, hashRouter, likesRouter ])

const PORT = process.env.PORT || 5000;
api.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
})

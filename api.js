import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const api = express();
api.use(cors())
api.use(express.json())

const PORT = process.env.PORT || 5000;
api.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
})

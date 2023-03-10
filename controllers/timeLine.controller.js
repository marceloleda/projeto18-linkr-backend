import { db } from "../database/database.connection.js";
import urlMetadata from 'url-metadata';



export async function getPosts(req, res){
    
    try{
       const metadata = await urlMetadata('https://medium.com/@pshrmn/');
       const { image, description, title, url } = metadata;
       console.log({image, description, title, url});

       const {rows: posts} = await db.query(`
       SELECT * 
       FROM posts
       ORDER BY created_at DESC
       LIMIT 20
       ;`)

       res.send(posts)
    }
    catch(error){
        console.log(error.message)
        return res.sendStatus(500);
    }
}
export async function createPost(req, res){
    const {userId, link, description} = req.body;
    try{
        await db.query(`INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3);`,
        [userId, link, description])
      
        res.sendStatus(201)
     }
     catch(error){
         console.log(error.message)
         return res.sendStatus(500);
     }
}
import { db } from "../database/database.connection.js";
import urlMetadata from 'url-metadata';

export async function getPosts(req, res){
    const user_id = '1';
    try{
        const {rows: posts} = await db.query(`
        SELECT 
        posts.id, 
        posts.link, 
        posts.description, 
        posts.created_at, 
        json_build_object(
            'title', metadata_posts.title, 
            'description', metadata_posts.description, 
            'image', metadata_posts.image, 
            'url', metadata_posts.url
        ) as metadata,
        json_build_object(
            'username', users.username,
            'picture_url', users.picture_url
        ) as user_info
        FROM posts
        LEFT JOIN metadata_posts ON metadata_posts.post_id = posts.id
        LEFT JOIN users ON users.id = posts.user_id
        ORDER BY posts.created_at DESC
        LIMIT 20;`)
       
       res.status(200).send(posts)
    }
    catch(error){
        console.log(error.message)
        return res.sendStatus(500);
    }
}
export async function createPost(req, res){
    const {link, description} = req.body;
    const userId ='1';
    try{
        await db.query(`INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3);`,
        [userId, link, description])

        const {rows: posts} = await db.query(`
        SELECT posts.id 
        FROM posts
        ORDER BY posts.id
        DESC
        LIMIT 1
        ;`)
   
        const metadata = await urlMetadata(`${link}`);

        const title = metadata.title;
        const descriptio = metadata.description;
        const image = metadata.image;
        const url = metadata.url;

        await db.query(
            'INSERT INTO metadata_posts (post_id, image, description, title, url) VALUES ($1, $2, $3, $4, $5);',
            [posts[0].id, image, descriptio, title, url]
          );
        
        res.sendStatus(201)
     }
     catch(error){
         console.log(error.message)
         return res.sendStatus(500);
     }
}
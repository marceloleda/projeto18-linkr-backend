import { db } from "../database/database.connection";
export async function timeLine(){
    try{
       const {rows: posts} = db.query(`SELECT * FROM posts;`)

       res.send(posts[0])
    }
    catch(error){
        console.log(error.message)
        return res.sendStatus(500);
    }
}
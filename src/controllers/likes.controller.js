import { db } from "../database/database.connection.js";

export async function likesController(req, res){
    const postId = req.body
    const userId = res.locals.userId
    
    try {
        const isLikedId = await db.query(`SELECT id FROM post_likes WHERE user_id = $1 AND post_id = $2`, [userId, postId])
        if (!isLikedId){
            db.query(`INSERT INTO post_likes (user_id, post_id)
            VALUES($1, $2)`, [userId, postId])
            res.sendStatus(201)
        } else {
            db.query(`DELETE FROM post_likes WHERE id = $1`, [isLikedId])
            res.sendStatus(204)
        }
    } catch (error) {
        res.status(500).send(error)
    }
} 
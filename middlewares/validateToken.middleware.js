import { db } from "../database/database.connection.js";

export async function validateToken(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');

    // const {rows: isValidToken} = await db.query(`SELECT * FROM sessions WHERE token = $1;`,  necessario verificar a tabela
    // [token])

    try{
        if(!token || isValidToken.length === 0){
            return res.sendStatus(401)
        }
        req.userId = isValidToken[0].userId
        next()
    }
    catch(error){
        res.sendStatus(422)
        return
    }
}
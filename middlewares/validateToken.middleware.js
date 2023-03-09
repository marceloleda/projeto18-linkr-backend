import { db } from "../database/database.connection.js";

export async function validateToken(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');

    const {rows: isValidToken} = await db.query(`SELECT * FROM WHERE;`,
    [token])

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


export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);
    try{
        const { rows:sessions } = await db.query(
            'SELECT * FROM  WHERE',
            [token]
        );
        console.log(sessions)
        const [session] = sessions;
    if (!session) return res.sendStatus(401);

        const {rows: users } = await db.query(
            'SELECT * FROM WHERE',
            [session.userId]
        );
        const [user] = users;
        if(!user) return res.sendStatus(401)
        res.locals.user = user;
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}
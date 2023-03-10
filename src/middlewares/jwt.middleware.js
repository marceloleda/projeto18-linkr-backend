import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const PRIVATE_KEY = process.env.JWT_SECRET;


export async function authentication(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userId = typeof payload !== 'string' && payload.userId;
        if(!userId) {
            return response.status(401).send('Invalid token');
        }

       res.locals.userId = userId;

    }catch(err){
        return res.status(401).send(err.message);
    }

    next();
}












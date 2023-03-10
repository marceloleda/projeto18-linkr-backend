import jsonwebtoken from "jsonwebtoken";
import { response } from "express";
import dotenv from "dotenv";
dotenv.config();

export const PRIVATE_KEY = '1010FFF';
export const user = {
    name: "aaaa",
    email: "aaaa@a.com"} 

export function tokenValited(res, req, next){
    const [,token] = req.headers.authorization?.split(' ') || [' ', ' '];
    if(!token) return res.status(401).send('Access denied. No token provided.');
    try {
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userIdFromToken = typeof payload !== 'string' && payload.user;
        if(!user && !userIdFromToken) {
            return response.send(401).json({ message: 'Invalid token'});
        }
        req.headers['user'] = payload.user;
        return next();
    } catch(err) {
        console.log(err);
        return res.status(401).json({ message: 'Invalid token'});
    }
}
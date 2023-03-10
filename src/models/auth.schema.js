import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const SECRET_KEY = '1010FFF';
export const user = {
    name: 'aaaa',
    email: 'aaaa@a.com'
};

export function tokenValidated(req, res, next) {
    const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const userIdFromToken = typeof payload !== 'string' && payload.user;
        if (!user && !userIdFromToken) {
            return res.status(401).json({ message: 'Invalid token'});
        }
        req.headers['user'] = payload.user;
        return next();
    } catch(err) {
        console.log(err);
        return res.status(401).json({ message: 'Invalid token'});
    }
}

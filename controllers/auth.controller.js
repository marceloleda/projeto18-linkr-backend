import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const { rows } = await db.query(
            'SELECT * FROM  WHERE',
            [email]
        );
        const [user] = rows;
        if (!user) return res.sendStatus(401);
        if(bcrypt.compareSync(password, user.password)){
            const token = uuid();
            await db.query(
                `
                INSERT INTO sessions (token, "userId")
                `,
                [token, user.id]
            );
            return res.send({token})
        }
        return res.sendStatus(401)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function signUp(req, res){
    const { name, email, password } = req.body;

    try{
        const existUser = await db.query(
            'SELECT * FROM  WHERE email',
            [email]
        );
        console.log(existUser)
        if(existUser.rowCount > 0) return res.sendStatus(409);
        const passwordHash = bcrypt.hashSync(password,10);
        console.log(passwordHash)

        await db.query(
            'INSERT INTO users (name, email, password)',
            [name, email, passwordHash]
        );
        return res.sendStatus(201);
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
}
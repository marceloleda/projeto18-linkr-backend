import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

export async function getUserByEmail(email) {
    return (await db.query(`SELECT * FROM users WHERE email = $1`, [email]))
  }
  
export async function createUser(user) {
    await db.query(`INSERT INTO users VALUES(DEFAULT, $1, $2, $3, $4)`, [
        user.email,
        user.password,
        user.username,
        user.picture_url
    ]);
}

export async function signIn(req, res) {
  try {
    const user = res.locals.user;

    const token = jsonwebtoken.sign(
      { userId: JSON.stringify(userId) },
      PRIVATE_KEY,
      { expiresIn: '60m' })

    return res.status(200).send( { token, user } );
    
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signUp(req, res) {
  try {
    const body = req.body;

    const hasUserWithEmail = await getUserByEmail(body.email);

    if (hasUserWithEmail) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(body.password, 10);

    await createUser({ ...body, password: passwordHash });

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Erro ao cadastrar",
      exception: err,
    });
  }
}
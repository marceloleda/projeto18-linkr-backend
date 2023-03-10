import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export async function getUserByEmail(email) {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
}

export async function createUser(user) {
  console.log('Creating user:', user);
  await db.query(`INSERT INTO users (email, password, username, picture_url) VALUES ($1, $2, $3, $4)`, [
    user.email,
    user.password,
    user.username,
    user.picture_url
  ]);
}

export async function signIn(req, res) {
  try {
    const user = res.locals.user;
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token, user });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signUp(req, res) {
  try {
    const { email, password, username, picture_url } = req.body;
    console.log("test")

    const hasUserWithEmail = (await getUserByEmail(email)).length > 0;

    if (hasUserWithEmail) {
      return res.status(409).send({ message: 'E-mail already registered.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    await createUser({ email, password: passwordHash, username, picture_url });

    res.status(201).send({ message: 'User created successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while registering",
      exception: err,
    });
  }
}
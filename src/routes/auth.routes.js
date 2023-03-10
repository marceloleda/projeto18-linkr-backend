import express from 'express';
import { signUp, signIn } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/schemaValidation.middlewares.js';
import { signUpSchema } from '../models/signup.schema.js';
import { signInSchema } from '../models/signin.schema.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSchema(signUpSchema), signUp);
authRouter.post('/signin', validateSchema(signInSchema), signIn);


export default authRouter;
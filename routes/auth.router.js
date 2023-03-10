import express from 'express';
import { validateSchema } from '../middlewares/schemaValidation.middlewares.js';
import { signIn, signUp } from '../controllers/auth.controller.js';
import { signInSchema } from '../models/signin.schema.js';
import { signUpSchema } from '../models/signup.schema.js';


const router = express.Router();

router.post('/signup', validateSchema(signUpSchema), signUp);
router.post('/signin', validateSchema(signInSchema), signIn);

export default router;

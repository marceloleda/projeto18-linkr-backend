import express from 'express';
import { signUp, signIn } from '../controllers/auth.controller.js';
// import {validateSignUp, validateSignIn} from '../middlewares/validateAuth.middleware.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
// router.post('/signup', validateSignUp, signUp);
// router.post('/signin', validateSignIn, signIn);



export default router;
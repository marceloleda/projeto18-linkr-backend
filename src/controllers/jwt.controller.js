// import jwt from 'jsonwebtoken';
// import { SECRET_KEY, user, tokenValited } from '../models/auth.schema';
// import express from 'express';

// const api = express();

// api.get('/', (_, res) => res.status(200).json({
//     message: 'this is a PUBLIC router...'
// }));

// api.get('/signin', (req, res) => {
//     const [,hash] = req.headers.authorization?.split(' ') || [' ', ' '];
//     const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
    
//     try {
//         const correctPassword = email === 'aaaa@a.com' && password === '123456';
//         if (!correctPassword) return res.status(401).send('Password or E-mail incorrect!');
        
//         const token = jwt.sign(
//             { user: JSON.stringify(user) },
//             SECRET_KEY,
//             { expiresIn: '60m' }
//         );

//         return res.status(200).json({ data: { user, token} });
//     } catch(err) {
//         console.log(err);
//         return res.send(err);
//     }
// });

// api.use('*', tokenValited);

// api.get('/SECRET', (req, res) => {
//     const { user } = req.headers
//     const currentUser = JSON.parse(user);
//     return res.status(200).json({
//         message: 'This is a SECRET router...',
//         data: {
//             userLogged: currentUser
//         }
//     })
// });

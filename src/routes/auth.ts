import { Router } from 'express';
import { check } from 'express-validator';

import  { login, reviewToken, createUser } from '../controllers/auth';
import { revalidateJWT } from '../middlewares/revalidateJwt';


const router:Router = Router();  

router.post(
    '/user/login', 
    [ 
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','El formato del email es incorrecto').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
    ],
    login
);


router.post(
    '/user/create', 
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('lastname','El apellido es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','El formato del email es incorrecto').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('password','El password debe tener un minimo de 8 caracteres').isLength({ min:8}),
    ],
    createUser
);
    
    router.get(
        '/user/review/token',
        revalidateJWT,  
        reviewToken
    );
module.exports = router;
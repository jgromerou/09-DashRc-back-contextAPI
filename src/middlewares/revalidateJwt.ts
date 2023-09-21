import { response, request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';

export const revalidateJWT = (req=request, res=response, next: () => void) => {

    const token = req.header("x-token-data");
    const secretKey = '0410762720612lubengui';
    
    if(!token){
        return res.status(401).json({
            status: 'error',
            msg: 'El token no existe!'
        });
    }
    
    try {

        const payload = jwt.verify(token, secretKey) as User;
        req.body = payload;
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: 'error',
            msg: 'El token es invalido'
        })
    }

    next();
}
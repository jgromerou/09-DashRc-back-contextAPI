import  { response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { dbSource } from '../dbConfig';
import { User } from '../entities/user.entity';
import { generateJWT } from '../hepers/jwt';
import { revalidateJWT } from '../middlewares/revalidateJwt';


const userRepository = dbSource.getRepository(User);



export const login = async(req:any, res = response) => {

    try {
        const errorsValidate = validationResult(req);
        const { email, password } =  req.body;
        const user = await userRepository.findOneBy({ email: email});
    
        if(!errorsValidate.isEmpty()){
            return res.status(400).json({
                status: 'error',
                msg: errorsValidate.array()[0].msg,
            });
        }

        if(!user){
            return res.status(400).json({
                status: 'error',
                msg: 'No existe el usuario o la contraseña'
            })
        };

        const validatePass = bcrypt.compareSync(password, user.password);

        if(!validatePass){
            return res.status(400).json({
                status: 'error',
                msg: 'La clave es incorrecta',
            });
        }

        const token = await generateJWT(user.id,  user.name,  user.lastname);

        res.status(200).json({
            status: 'success',
            msg: 'Usuario logueado con exito',
            res: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                token
            }
        });
        
    } catch (error) {
        response.status(500).json({
            status: 'error',
            msg: 'Error al  intentar acceder al sistema!'
        });
    }
}





export const createUser = async(req:any, response:any) => {

    try {
        const errorsValidate = validationResult(req);
        const { email, password } =  req.body;
        const existUser = await userRepository.findOneBy({ email: email});
        
        if(!errorsValidate.isEmpty()){
            return response.status(400).json({
                status: 'error',
                msg: 'Error alintentar crear el usuario!',
                res: errorsValidate.mapped(),
            });
        }
        

        if(existUser){
            return response.status(400).json({
                status: 'error',
                msg: 'El email ya se encuentra registrado!'
            })
        };

        const salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync(password, salt);

        const user:User = {
            ...req.body,
            password: pass,
            is_active: true
        }
    
        const userData = await userRepository.save(user);
        
        if(userData){
            const token = await generateJWT(userData.id, userData.name, userData.lastname);

            response.status(200).json({
                status:'success',
                msg:'Usuario creado correctamente!',
                res: {
                    id: user.id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    token
                }
            });
        }

    } catch (error) {
        response.status(500).json({
            status: 'error',
            msg: 'Error alintentar crear el usuario!'
        });
    }
}



export const reviewToken = async (req:any, response:any) => {

    const { id, name, lastname } = req.body;
    const token  = await generateJWT (id, name, lastname);

    response.status(200).json({
        status:'success',
        msg:'Token generado correctamente!',
        res: {
            id,
            name,
            lastname,
            token
        }
    });
}


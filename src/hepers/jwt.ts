import jwt from 'jsonwebtoken';


export const generateJWT = (id: number, name:string, lastname:string):Promise< string | undefined > => {

    return new Promise( (resolve, reject ) => {
        const payload = {  id, name, lastname };
        const secretKey = '0410762720612lubengui';
        jwt.sign(payload, secretKey, { 
            expiresIn: '2h'
        }, (err, token) => {

            if(err){
                console.log(err, 'JWT-ERROR');
                reject('Error algenerar el JWT');
            };

            resolve(token);
        });
    })
}
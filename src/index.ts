import 'dotenv/config'
import express from 'express';
import cors from 'cors';

import { dbSource } from './dbConfig';

//Conexion DB
dbSource.initialize().then(() => {
    console.log("Conexion DB initialized!")
}).catch((err) => {
    console.error("Error Conexion DB:", err)
})

const app =  express();
const PORT = process.env.PORT;

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));


app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})
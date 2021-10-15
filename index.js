import app from './app';
import tls from 'tls';
import dotenv from 'dotenv';
//import {getConnection} from './database/connection'
tls.DEFAULT_MIN_VERSION = 'TLSv1';
dotenv.config();

app.listen(process.env.PORT,()=>console.log("Escuchando en el puerto", process.env.PORT));
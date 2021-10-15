import app from './app';
import tls from 'tls';
import dotenv from 'dotenv';
//import {getConnection} from './database/connection'
tls.DEFAULT_MIN_VERSION = 'TLSv1';
dotenv.config();

/*let prueba = async ()=>{
    try {
      let pool =await getConnection();
     let productos = await pool.request().execute('GetProducts');
     console.log(productos)
     

    } catch (error) {
        console.log(error)
    }
}*/
//prueba();
app.listen(process.env.PORT,()=>console.log("Escuchando en el puerto", process.env.PORT));
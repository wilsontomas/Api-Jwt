import sql from 'mssql';
import { getConnection } from '../database/connection';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
let asegurarToken=(req,res,next)=>{
    try {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !=='undefined'){
            const bearer = bearerHeader.split(" ");
            req.token = bearer[1];
            next();
        }else{
            res.status(401).json({"Mensaje":"No se envio ningun token"});
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"Mensaje":"Ocurrio un error al verificar el token"});
   
    }
}
let validaUsuario = async (Gmail)=>{
    try {
        let pool = await getConnection();
        let resultado = await pool.request()
        .input('Gmail',sql.VarChar(150),Gmail)
        .execute('verifyUserCount');

        if(resultado.recordset[0].conteo>0){
            return true;
        }
        return false;
    } catch (error) {
        console.log(error.messaje);
        return false;
    }
}
let validarToken = (req,res,next)=>{
        try {
            Jwt.verify(req.token,process.env.SECRET,(error,decifrado)=>{
                if(error){
                    res.status(403).json({"Mensaje":"El token es invalido"});
                    return;
                }
                if(validaUsuario(decifrado.Gmail)){
                    console.log("El usuario es correcto");
                    next();
                }else{
                    res.status(403).json({"Mensaje":"El usuario no es valido"});

                }
               
            });
        } catch (error) {
            console.log(error.messaje);
            res.status(500).json({"Mensaje":"Error interno del servidor al verificar el token"});
        }
}
export default {
    asegurarToken,
    validarToken
}
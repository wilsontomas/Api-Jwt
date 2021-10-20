import bcrypt from 'bcryptjs';
import {getConnection} from '../database/connection';
import sql from 'mssql';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

let signUp = async(req,res)=>{
    try {
        //generar la clave encriptada
        let {Gmail, Clave} = req.body;
        let salt = await bcrypt.genSalt(10);
        let ClaveCifrada= await bcrypt.hash(Clave,salt)
        console.log("Usuario creado con exito");

        //agregar a la base de datos
        let pool = await getConnection();
        await pool.request()
        .input('Gmail',sql.VarChar(150),Gmail)
        .input('Clave',sql.VarChar(250),ClaveCifrada)
        .execute('addUser');

        res.status(200).json({"Mensaje":"Se agrego el usuario"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"mensaje":"Error interno al generar la clave"});
    }
}

let signIn=async (req,res)=>{
   try {
    let {Gmail,Clave} = req.body;
    let pool = await getConnection();
    let resultado = await pool.request()
    .input('Gmail',sql.VarChar(150),Gmail)
    .execute('verifyUser');
    let ClaveCifrada = resultado.recordset[0].Clave;
    let RoleId = resultado.recordset[0].RoleId;
    let IdUsuario = resultado.recordset[0].IdUsuario;

    let respuesta =await bcrypt.compare(Clave,ClaveCifrada);
    
    if(respuesta){
        
       let token = Jwt.sign({
            IdUsuario,
            Gmail,
            RoleId
        }, process.env.SECRET);
        
         res.status(200).json({token});
         return;
    }else{
        res.status(200).json({"Mensaje":"Usuario invalido"})
    }

   
   } catch (error) {
       console.log(error.message)
       res.status(500).json({"Mensaje":"Error en el signIn"});

   }


}

export default {
    signUp,
    signIn
}
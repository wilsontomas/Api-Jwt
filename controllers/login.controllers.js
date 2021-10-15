import bcrypt from 'bcryptjs';
import {getConnection} from '../database/connection';
import sql from 'mssql';

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

        res.status(200).json({"Mensaje":"Se agrego el ususario"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"mensaje":"Error interno al generar la clave"});
    }
}

let signIn=async (req,res)=>{

}

export default {
    signUp,
    signIn
}
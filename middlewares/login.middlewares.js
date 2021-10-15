import { getConnection } from "../database/connection";
import bcrypt from 'bcryptjs';
import sql from 'mssql';


let VerificarUsuarioExiste = async(req,res,next)=>{
   try {
    let {Gmail}=req.body;

    let pool = await getConnection();
    let resultado = await pool.request()
    .input('Gmail',sql.VarChar(150),Gmail)
    .execute('verifyUserCount');

    if(resultado.recordset[0].conteo>0){
        res.status(400).json({"Mensaje":"El usuario ya existe"});
        return;
    }

    next();
    
    
    
   } catch (error) {
       console.log(error.message)
   }
}

export default {
    VerificarUsuarioExiste
}
import {getConnection} from '../database/connection';
import sql from 'mssql';


let GetProducts =async (req,res)=>{
    try {
        let pool =await getConnection();
       let productos = await pool.request().execute('GetProducts');
       console.log(productos)
        res.status(200).json(productos);
  
      } catch (error) {
          console.log(error)
      }
}


let GetProductsById=async (req,res)=>{
    try {
        let parametro = req.params.id;
       let pool =await getConnection();
       let productos = await pool.request()
       .input('Id',sql.Int,parametro)
       .execute('GetProductsById');

       console.log(productos.recordset)
        res.status(200).json(productos.recordset);
        
  
      } catch (error) {
          console.log(error)
      }
}

let UpdateProductById=async (req,res)=>{
    try {
        let parametro = req.params.id;
        let body =req.body;
      /* let pool =await getConnection();
       let productos = await pool.request()
       .input('Id',sql.Int,parametro)
       .execute('GetProductsById');

       console.log(productos.recordset)
        res.status(200).json(productos.recordset);
        */
  
      } catch (error) {
          console.log(error)
      }
}
export default {
    GetProducts,
    GetProductsById
}
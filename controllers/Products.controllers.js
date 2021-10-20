import {getConnection} from '../database/connection';
import sql from 'mssql';


let GetProducts =async (req,res)=>{
    try {
        let pool =await getConnection();
       let productos = await pool.request().execute('GetProducts');
       console.log(productos)
        res.status(200).json(productos.recordset);
  
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
          res.status(500).json({"Mensaje":"Error al consultar registro"});

      }
}

let UpdateProductById=async (req,res)=>{
    try {
        let parametro = req.params.id;
        let {Nombre, Cantidad} =req.body;
        //console.log(parametro,req.body);
        
      let pool =await getConnection();
        await pool.request()
       .input('Id',sql.Int,parametro)
       .input('Nombre',sql.VarChar(150),Nombre)
       .input('Cantidad',sql.Int,Cantidad)
       .execute('EditProductById');
        console.log("Se ha actualizado el registro")
       res.status(200).json({"Mensaje":"Se ha actualizado el registro"});
    
        
      } catch (error) {
          console.log(error)
          res.status(500).json({"Mensaje":"Error al actualizar el registro"});
    
      }
}

let DeleteProductById=async (req,res)=>{
    try {
        let parametro = req.params.id;
    
        //console.log(parametro,req.body);
        
      let pool =await getConnection();
        await pool.request()
       .input('Id',sql.Int,parametro)
       .execute('DeleteProductById');
        console.log("Se ha eliminado el registro")
       res.status(200).json({"Mensaje":"Se ha eliminado el registro"});
    
        
      } catch (error) {
          console.log(error)
          res.status(500).json({"Mensaje":"Error al eliminar el registro"});

      }
}

let CreateProduct=async (req,res)=>{
    try {
        let {Nombre,Cantidad} = req.body;
    
      let pool =await getConnection();
       let product = await pool.request()
       .input('Nombre',sql.VarChar(150),Nombre)
       .input('Cantidad',sql.Int,Cantidad)
       .execute('CreateProduct');
        console.log("Se ha creado el registro")
       res.status(201).json({"Mensaje":"Se ha creado el producto"});
    
        
      } catch (error) {
          console.log(error)
          res.status(500).json({"Mensaje":"Error al crear un registro"});

      }
}

export default {
    GetProducts,
    GetProductsById,
    UpdateProductById,
    DeleteProductById,
    CreateProduct
}
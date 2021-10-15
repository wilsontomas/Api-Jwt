import {Router} from 'express';
import controllers from '../controllers/Products.controllers'
let ProductRouter = Router();

ProductRouter.get('/product',controllers.GetProducts);
ProductRouter.post('/product',controllers.CreateProduct);
ProductRouter.put('/product/:id',controllers.UpdateProductById);
ProductRouter.get('/product/:id',controllers.GetProductsById);
ProductRouter.delete('/product/:id',controllers.DeleteProductById);

export default ProductRouter;
import {Router} from 'express';
import controllers from '../controllers/Products.controllers'
let ProductRouter = Router();

ProductRouter.get('/product',controllers.GetProducts);
//ProductRouter.post('/product',);
//ProductRouter.put('/product',);
ProductRouter.get('/product/:id',controllers.GetProductsById);
//ProductRouter.delete('/product',);

export default ProductRouter;
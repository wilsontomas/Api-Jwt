import {Router} from 'express';
import controllers from '../controllers/Products.controllers';
import middlewares from '../middlewares/Product.middlewares';
let ProductRouter = Router();

ProductRouter.get('/product',controllers.GetProducts);
ProductRouter.post('/product',[middlewares.asegurarToken,middlewares.validarToken],controllers.CreateProduct);
ProductRouter.put('/product/:id',[middlewares.asegurarToken,middlewares.validarToken],controllers.UpdateProductById);
ProductRouter.get('/product/:id',controllers.GetProductsById);
ProductRouter.delete('/product/:id',[middlewares.asegurarToken,middlewares.validarToken],controllers.DeleteProductById);

export default ProductRouter;
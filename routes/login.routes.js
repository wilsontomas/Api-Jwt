import {Router} from 'express';
import controllers from '../controllers/login.controllers';
import middlewares from '../middlewares/login.middlewares';
let LoginRouter = Router();

LoginRouter.post('/login/signUp',middlewares.VerificarUsuarioExiste,controllers.signUp);
LoginRouter.post('/login/signIn',controllers.signIn);


export default LoginRouter;
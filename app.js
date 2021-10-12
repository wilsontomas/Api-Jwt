import express from "express";
import morgan from "morgan";
import cors from 'cors';
let app = express();

//routes
import ProductRouter from './routes/Products.routes'

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));

app.use('/api',ProductRouter);

export default app;


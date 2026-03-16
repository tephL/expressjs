import express, { request, response } from 'express';
import cookieParser from 'cookie-parser';

import {helloMiddleware, loggingMiddleware} from '../utils/middlewares.mjs';
import userRouter from "./routers/users.mjs";
import productsRouter from "./routers/products.mjs";

const app = express();
app.use(cookieParser("secret"));

app.use(express.json());
app.use(userRouter);
app.use(productsRouter);

const PORT = process.env.PORT || 3000;


app.get('/', (request, response) => {
    response.cookie('hello', 'world', { maxAge: 3600000, signed: true });
    response.status(200).send("welcome to my site!");
});


console.log("Server file loaded");
app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});

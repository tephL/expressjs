import express from 'express';
import router from './routers/products.mjs';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser("nigga"));
app.use(router);
const PORT = 3000;

app.get('/', (req, res)=>{
    return res.status(200).cookie("logged_in", "yes", { signed: true, maxAge: 1000 * 10}).send({
        message: "Welcome to Ice Cream Shop"
    });
});

app.post('/api/users', (req, res) => {
    console.log(req.body);
});

app.listen(PORT, ()=>{
    console.log(`listening to port: ${PORT}`);
});


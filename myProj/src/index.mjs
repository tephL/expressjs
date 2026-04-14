import express from 'express';
import router from './routers/products.mjs';

const app = express();
app.use(express.json());
app.use(router);
const PORT = 3000;

app.get('/', (req, res)=>{
    return res.status(200).send("Welcome to Ice Cream Shop");
});

app.post('/api/users', (req, res) => {
    console.log(req.body);
});

app.listen(PORT, ()=>{
    console.log(`listening to port: ${PORT}`);
});


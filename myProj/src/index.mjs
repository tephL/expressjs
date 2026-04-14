import express from 'express';
import router from './routers/products.mjs';

const app = express();
app.use(router);
const PORT = 3000;

app.get('/', (req, res)=>{
    return res.status(200).send("Welcome to Ice Cream Shop");
});

app.get('/api/users', (req, res) => {
    
});

app.listen(PORT, ()=>{
    console.log(`listening to port: ${PORT}`);
});


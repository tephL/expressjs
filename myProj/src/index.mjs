import express from 'express';
import router from './routers/products.mjs';
import usersRouter from './routers/users.mjs';
import cookieParser from 'cookie-parser';
// Sessions
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import passport from 'passport';
import './strategies/userAuth.mjs';

// database
import { Users, Products } from '../database/models.mjs';

import { mock_products, mock_users } from '../utils/constants.mjs';

const app = express();
app.use(express.json());
app.use(cookieParser("nigga"));

const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'icecream'
});
app.use(session({
    secret: "Stephen",
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
    cookie: {
        maxAge: (1000 * 60) 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(usersRouter);
const PORT = 3000;


app.post('/login', (req, res) => {
    let username = req.body.username;

    req.session.user = {
        username: username
    }

    console.log(req.session);

    return res.status(200).send({
        message: `Successfully logged in as ${username}`
    });
});


app.get('/', (req, res)=>{
    console.log(req.session);
    
    return res.status(200).cookie("logged_in", "yes", { 
        signed: true, 
        maxAge: (1000 * 10) * 600
    }).send({
        message: "Welcome to Ice Cream Shop"
    });
});


app.post('/cart', (req, res) => {
    let { item_id } = req.body;

    let foundProduct = mock_products.find((product) => product.id == item_id);
    if(!foundProduct) return res.status(400).send("Item doesn't exist.");

    req.session.item = foundProduct.name;
    console.log(req.session);

    return res.status(200).send({
        message: "Succesfully added to card"
    });
});


app.listen(PORT, ()=>{
    console.log(`listening to port: ${PORT}`);
});


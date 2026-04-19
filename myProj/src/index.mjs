import express from 'express';
import router from './routers/products.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './strategies/userAuth.mjs';

import { mock_products, mock_users } from '../utils/constants.mjs';

const app = express();
app.use(express.json());
app.use(cookieParser("nigga"));
app.use(session({
    secret: "Stephen",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: (1000 * 60) 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
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


app.post('/auth/login', (req, res) => {
    let { body: { username, password } } = req;
    let findUser = mock_users.find((user) => user.username === username);
    
    if(!findUser){
        return res.status(200).send({
            message: "User not found"
        });
    }

    let matchedPassword = findUser.password == password;
    if(!matchedPassword){
        return res.status(200).send({
            message: "Password wrong."
        });
    }

    req.session.user = findUser;
    console.log(req.session);
    return res.status(200).send({
        message: `Logged in as ${username}`
    });
});


app.post('/api/auth', passport.authenticate("local"), (req, res) => {
    console.log(req.session);
    res.sendStatus(200);
});


app.post('/api/logout', (req, res) => {
    console.log("logging out");
    req.logout((err) => {
        try{
            if(err) throw new Error("U aint logged in"); 
            return res.status(200).send("Logged out");
        }catch(err2){
            return res.send(err2);
        }
    });
});


app.get('/api/auth/status', (req, res) => {
    console.log(req.user);
    console.log(req.session);
    return res.sendStatus(200);
});


app.get('/api/admin', (req, res) => {
    if(!req.user) return res.sendStatus(403);

    let {user} = req;
    console.log(user);
    if(user.role !== "admin") return res.sendStatus(403);

    return res.status(200).send({
        message: "Admin"
    });
});


app.listen(PORT, ()=>{
    console.log(`listening to port: ${PORT}`);
});


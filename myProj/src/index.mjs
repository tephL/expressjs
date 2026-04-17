import express from 'express';
import router from './routers/products.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { mock_users } from '../utils/constants.mjs';

const app = express();
app.use(express.json());
app.use(cookieParser("nigga"));
app.use(session({
    secret: "Stephen",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: (1000 * 10) * 600
    }
}));
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

app.delete('/logout', (req, res) => {
    const { username } = req.session.user;

    req.session.destroy(err => {
        if(err){
            throw err;
        }
        return res.status(200).send({
            message: `Successfully logged out ${username}`
        });
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

    console.log(req.session.id);
    
    if(req.session.items){
        req.session.items += 1;
    } else {
        req.session.items = 1;
    }
    
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


app.listen(PORT, ()=>{
    console.log(`listening to port: ${PORT}`);
});


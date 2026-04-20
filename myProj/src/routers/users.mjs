// Passport
import passport from 'passport';
import '../strategies/userAuth.mjs';
// Validators
import { checkSchema, validationResult } from 'express-validator';
import { newUserValidation, userSchema } from '../../utils/userValidator.mjs';
// Models
import { Users } from '../../database/models.mjs';
// Middlewares
import { handleValidationErrors } from '../../utils/middlewares.mjs';
import { hashPassword } from '../../utils/helpers.mjs';
import { Router } from 'express';


const userRouter = Router();


userRouter.post('/api/users', 
    newUserValidation, 
    handleValidationErrors, 
async (req, res) => {
    let { username, password, displayName } = req.body;

    // hashing
    const hashedPassword = hashPassword(password);

    // storing
    const createdUser = await Users.create({
        username: username,
        password: hashedPassword,
        display_name: displayName
    });

    return res.status(200).send({
        message: "Successfully created user.",
        user: createdUser
    });
});


userRouter.post('/api/auth', 
    checkSchema(userSchema), 
    handleValidationErrors, 
    passport.authenticate("local"), 
(req, res) => {
    res.status(200).send({
        message: "Successfully logged in",
        data: req.session
    });
});


userRouter.post('/api/logout', (req, res) => {
    req.logout((err) => {
        try{
            if(err) throw new Error("U aint logged in"); 
            return res.status(200).send("Logged out");
        }catch(err2){
            return res.send(err2);
        }
    });
});


userRouter.get('/api/auth/status', (req, res) => {
    return res.status(200).send(req.session);
});


userRouter.get('/accounts', async (req, res) => {
    let findUser = await Users.findAll({
        raw: true
    });

    let publicUsers = findUser.map(({username, display_name}) => ({username, display_name}) );
    
    return res.status(200).send(publicUsers);
});

export default userRouter;

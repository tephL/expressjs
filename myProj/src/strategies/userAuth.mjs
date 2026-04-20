// Dependencies
import passport from 'passport';
import Strategy from 'passport-local';
// Model
import {Users, Products} from '../../database/models.mjs';
// Hash
import { validatePassword } from '../../utils/helpers.mjs';


export default passport.use(
    new Strategy(async (username, password, done) => {
        try{
            // username lookup
            let foundUser = await Users.findOne({
                where: { username : username },
                raw: true 
            });
            if(!foundUser) throw new Error("Username not found.");

            // password auth
            const passwordMatched = validatePassword(password, foundUser.password);
            if(!passwordMatched) throw new Error("Invalid credentials");

            done(null, foundUser.user_id);
        }catch(err){
            done(err, null);
        }
    })
);


passport.serializeUser((user_id, done) => {
    console.log("serializing...");
    done(null, user_id);
});


passport.deserializeUser(async (user_id, done) => {
    console.log(`Deserializing user: ${user_id}`);
    try{
        // id exists
        const findById = await Users.findByPk(user_id, {raw: true});
        console.log(findById);
        done(null, findById);
    }catch(err){
        done(err, null);
    }
});

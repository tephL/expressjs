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

            done(null, { 
                role: "nigger",
                user_id: foundUser.user_id
            });
        }catch(err){
            done(err, null);
        }
    })
);


passport.serializeUser((user, done) => {
    console.log("serializing...");
    done(null, user);
});


passport.deserializeUser(async (user, done) => {
    console.log(`Deserializing user: ${user.user_id}`);
    try{
        // id exists
        const findById = await Users.findByPk(user.user_id, {raw: true});
        done(null, findById);
    }catch(err){
        done(err, null);
    }
});

// Dependencies
import passport from 'passport';
import Strategy from 'passport-local';

// Model
import { mock_users } from '../../utils/constants.mjs';
import {users, products} from '../../database/models.mjs';


export default passport.use(
    new Strategy(async (username, password, done) => {
        try{
            // username lookup
            let foundUsername = await users.findOne({
                where: { username : username },
                raw: true 
            });
            if(!foundUsername) throw new Error("Username not found.");

            // password auth
            if(foundUsername.password !== password) throw new Error("Invalid credentials");
            done(null, foundUsername.user_id);
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
        const findById = await users.findByPk(user_id, {raw: true});
        console.log(findById);
        done(null, findById);
    }catch(err){
        done(err, null);
    }
});

// Dependencies
import passport from 'passport';
import Strategy from 'passport-local';

// Model
import { mock_users } from '../../utils/constants.mjs';


export default passport.use(
    new Strategy((username, password, done) => {
        try{
            // username lookup
            let foundUser = mock_users.find((user) => user.username == username);
            if(!foundUser) throw new Error("Username not found.");
            
            // password auth
            let correctPassword = foundUser.password === password;
            if(!correctPassword) throw new Error("Incorrect credentials");
            
            done(null, foundUser.id);
        }catch(err){
            done(err, null);
        }
    })
);


passport.serializeUser((id, done) => {
    console.log("serializing...");
    done(null, id);
});


passport.deserializeUser((id, done) => {
    console.log(`Deserializing user: ${id}`);
    try{
        // id exists
        let findUser = mock_users.find((user) => user.id == id);
        if(!findUser) throw new Error("User doesn't exist.");
        done(null, findUser);
    }catch(err){
        done(err, null);
    }
});

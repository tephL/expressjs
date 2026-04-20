import bcrypt from 'bcrypt';
import { Users } from '../database/models.mjs';

const saltRounds = 10;

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword =  bcrypt.hashSync(password, salt);
    return hashedPassword;
}

export const validatePassword = (plain, hashed) => {
    const result = bcrypt.compareSync(plain, hashed);
    return result;
}

export const usernameExists = async (username) => {
    const usernameExists = await Users.findOne({
        where: { username: username },
        raw: false
    });

    return usernameExists ? true : false;
}

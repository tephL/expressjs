import { body } from "express-validator"
import { usernameExists } from "./helpers.mjs";

export const newUserValidation = [
    body('username')
        .notEmpty()
        .withMessage("Username cant be empty.")
        .isLength({min: 5, max: 12})
        .withMessage("Username must be between 5 and 12 characters.")
        .custom(async (value) => {
            const exists = await usernameExists(value);
            if(exists) throw new Error("Username already exists");
            return true;
        }),
    body('password')
        .notEmpty()
        .withMessage("Password cant be empty.")
        .isLength({min: 8, max: 20})
        .withMessage("Password must atleast be 8 characters."),
    body('displayName')
        .notEmpty()
        .withMessage("Display name cant be empty.")
        .isLength({min: 4, max: 20})
        .withMessage("Display name must atleast be 4 characters.")
];

export const newUserSchema = {
    username: {
        notEmpty: {
            errorMessage: "Username cant be empty."
        },
        isLength: {
            options: {
                min: 5,
                max: 12    
            },
            errorMessage: "Username must be between 5 and 12 characters."
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password cant be empty."
        },
        isLength: {
            options: {
                min: 8,
                max: 20
            },
            errorMessage: "Password must atleast be 8 characters."
        }
    },
    displayName: {
        notEmpty: {
            errorMessage: "Display Name cant be empty."
        },
        isLength: {
            options: {
                min: 4,
                max: 20
            },
            errorMessage: "Display name must atleast be 4 characters."
        }
    }
}

export const userSchema = {
    username: {
        notEmpty: {
            errorMessage: "Username cant be empty."
        },
        isLength: {
            options: {
                min: 5,
                max: 12    
            },
            errorMessage: "Username must be between 5 and 12 characters."
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password cant be empty."
        },
        isLength: {
            options: {
                min: 8,
                max: 20
            },
            errorMessage: "Password must atleast be 8 characters."
        }
    }
}
export const createUserValidationSchema = {
    name: {
        isString: {
            errorMessage: "must be a string"
        },
        notEmpty: {
            errorMessage: "bruh u should put something here"
        },
        isLength: {
            options: {
                min: 3,
                max: 20
            }
        }

    }
};

/*
[
        body("name")
        .isString().withMessage("must not be a number")
        .notEmpty().withMessage("bruh u should put something here")
        .isLength({ min: 3, max: 20}).withMessage("must have more than 2 chars"),
        body("gender")
        .notEmpty().withMessage("choose ur gender twin")
        .isString().withMessage("bruh theres no num for genders")
        .isLength({min:3, max:10}).withMessage("broooo theres no gender that short/long")
    ],  */
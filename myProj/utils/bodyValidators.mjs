export const newDataValidator = {
    name: {
        notEmpty: {
            errorMessage: "Name is required."
        },
        isString: {
            errorMessage: "Name must be a string"
        },
        isLength: {
            options: {
                min: 4,
                max: 20
            },
            errorMessage: "Name must be between 4 and 20 letters."
        }
    },
    price: {
        notEmpty: {
            errorMessage: "Price is required."
        },
        isInt: {
            errorMessage: "Price must be a numerical value."
        },
        isLength: {
            options: {
                min: 1,
                max: 10
            },
            errorMessage: "Price must be between 1-10 digits."
        }
    }
}

export const patchDataValidator = {
    id: {
        notEmpty: {
            errorMessage: "Product ID must be provided."
        },
        isInt: {
            errorMessage: "Product ID are numerical values."
        }
    },
    name: {
        optional: true,
        isString: {
            errorMessage: "Name must be a string"
        },
        isLength: {
            options: {
                min: 4,
                max: 20
            },
            errorMessage: "Name must be between 4 and 20 letters."
        }
    },
    price: {
        optional: true,
        isInt: {
            errorMessage: "Price must be a numerical value."
        },
        isLength: {
            options: {
                min: 1,
                max: 10
            },
            errorMessage: "Price must be between 1-10 digits."
        }
    }
}
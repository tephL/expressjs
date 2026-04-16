export const sortValidator = {
    sort: {
        optional: true,
        isIn: {
            options: [["price"]],
            errorMessage: "Invalid sort method."
        }
    },
    order: {
        optional: true,
        isIn: {
            options: [["asc", "desc"]],
            errorMessage: "Invalid sort's order method"
        }
    }
}
import { mock_users } from "./constants.mjs";

// middleware for logging website access in console
// next: is the function preceding the middleware function
export const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

export const helloMiddleware = (req, res, next) => {
    console.log("hello this is a middleware that says hello!");
    next();
}

// middleware for handling user id
export const userIdValidator = (request, response, next) => {
    const { params:{ id } } = request;

    // validate if its a num
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.status(400).send("id must be an INT");
    
    // validate if id exists
    const userIndexById = mock_users.findIndex((user) => user.id === parsedId);
    if(userIndexById === -1) return response.status(400).send("user doesnt exist");
    
    // pass to next middleware
    request.userIndexById = userIndexById;
    next();
}

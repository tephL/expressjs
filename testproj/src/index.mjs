import express, { request, response } from 'express';
import { query, validationResult, body, checkSchema, check} from 'express-validator';
import { createUserValidationSchema } from "../utils/checkSchema.js"; 

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const mock_users = [
    {id : 101, name : "stephen", gender : "male"},
    {id : 102, name : "suvi", gender : "female"},
    {id : 103, name : "monchi", gender : "male"},
    {id : 104, name : "bnoy", gender : "female"},
];

// middleware for logging website access in console
// next: is the function preceding the middleware function
const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

const helloMiddleware = (req, res, next) => {
    console.log("hello this is a middleware that says hello!");
    next();
}

// middleware for handling user id
const userIdValidator = (request, response, next) => {
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


// for global use
// app.use(loggingMiddleware);

// individual middleware func
app.get('/', helloMiddleware, loggingMiddleware, (request, response) => {
    response.status(200).send("welcome to my site!");
});


app.get('/api/users',
    [
        query("filter")
        .notEmpty().withMessage("u must filter something")
        .isLength({ min: 2, max: 10 }).withMessage("length of filter type is only between 2 and 5"),
        query("value")
        .notEmpty().withMessage("filter must have a value")
        .isLength({min:3, max: 10}).withMessage("value must be between 3 and 10 chars only")
    ],
    (request, response) => {
        // validating the query
        const result = validationResult(request);
        if(!result.isEmpty()) return response.status(400).send(result);

        // destructuring the query given by request
        const { query: { filter, value } } = request;

        // handling misisng key=value pairs
        if(filter && value){
            const filteredUsers = mock_users.filter((element) => {
                return String(element[filter]).includes(value);
            } );
            return response.status(200).send(filteredUsers);
        }
        // return all users if no query
        return response.status(200).send(mock_users);
    });

app.get('/api/users/:id',
    userIdValidator,
    (request, response) => {
    const { userIndexById } = request;
    // find user
    const findUser = mock_users[userIndexById];
    // id details returner
    return response.status(200).send(findUser);
});


app.post('/api/users', checkSchema(createUserValidationSchema),    
    (request, response) => {
        // accessing the body validator
        const result = validationResult(request);
        console.log(result);
        // validator if there are errors within the validationResult
        if(!result.isEmpty()) return response.status(400).send(result);

        // detsructuring the body
        const name = request.body.name;
        const gender =  request.body.gender;

        // appending to the array of users
        const nextIdOfArray = mock_users[mock_users.length - 1].id + 1; 
        const newUser = {id: nextIdOfArray, name: name, gender: gender};
        mock_users.push(newUser);

        console.log(`added new user: ${newUser}`);
        return response.status(201).send(newUser);
});


app.put('/api/users/:id', userIdValidator, (request, response) => {
    const { userIndexById, body } = request;

    // update
    mock_users[userIndexById] = {id:mock_users[userIndexById].id, ...body};
    console.log(mock_users[userIndexById]);

    return response.sendStatus(200);
});

app.patch("/api/users/:id", userIdValidator, (request, response)=>{
    const { userIndexById, body } = request;

    // final phase: modifying the array index
    mock_users[userIndexById] = {...mock_users[userIndexById], ...body};
    console.log(mock_users[userIndexById]);

    return response.status(200).send(body);
});

app.delete('/api/users/:id', (request, response)=>{
    const { params: { id },
            body
          } = request;
    
    // validate id
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);

    // validate id existence
    const userIndexById = mock_users.findIndex((user) => user.id === parsedId);
    if(userIndexById === -1) return response.sendStatus(400);

    // final phase: remove element with matching id from the array
    mock_users.splice(userIndexById, 1);
    return response.status(200).send("success deletion");
});

console.log("Server file loaded");
app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});

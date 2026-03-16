import express, { Router } from 'express';
import { query, validationResult, checkSchema } from 'express-validator';
import { mock_users } from '../../utils/constants.mjs';
import { userIdValidator, helloMiddleware } from '../../utils/middlewares.mjs'; 
import { createUserValidationSchema } from "../../utils/checkSchema.js"; 


const router = Router();


// CREATE (POST)
router.post('/api/users/', checkSchema(createUserValidationSchema),    
    (request, response) => {
        // accessing the body validator
        const result = validationResult(request);
        console.log(result);
        console.log(request.body);
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


// READ (GET)
router.get('/api/users',
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
    }
);

router.get('/api/users/:id',
    userIdValidator,
    (request, response) => {
    const { userIndexById } = request;
    // find user
    const findUser = mock_users[userIndexById];
    // id details returner
    return response.status(200).send(findUser);
});


// UPDATE (PATCH, PUT)
router.patch("/api/users/:id", userIdValidator, (request, response)=>{
    const { userIndexById, body } = request;

    // final phase: modifying the array index
    mock_users[userIndexById] = {...mock_users[userIndexById], ...body};
    console.log(mock_users[userIndexById]);

    return response.status(200).send(body);
});

router.put('/api/users/:id', userIdValidator, (request, response) => {
    const { userIndexById, body } = request;

    // update
    mock_users[userIndexById] = {id:mock_users[userIndexById].id, ...body};
    console.log(mock_users[userIndexById]);

    return response.sendStatus(200);
});


// DELETE (DELETE)
router.delete('/api/users/:id', (request, response)=>{
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


export default router;
import express, { request, response } from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const mock_users = [
    {id : 101, name : "Stephen", gender : "male"},
    {id : 104, name : "Stephen", gender : "male"},
    {id : 103, name : "Stephen", gender : "male"},
    {id : 102, name : "Stephenie", gender : "female"},
];

app.get('/', (request, response) => {
    response.status(200).send("welcome to my site!");
});


app.get('/api/users', (request, response)=> {
    console.log(request.query);

    // destructuring the query given by request
    const filter = request.query.filter;
    const value = request.query.value;
    

    // handling misisng key=value pairs
    if(filter && value){
        const filteredUsers = mock_users.filter((element) => element[filter].includes(value) );
        response.status(200).send(filteredUsers);
    } else {
        // return all users if no queryy
        return response.status(200).send(mock_users);
    }

    console.log(`filter by: ${filter}`);
    console.log(`value: ${value}`);
});

app.get('/api/users/:id', (request, response)=>{
    const id = request.params.id;
    
    // id validations (if its an INT)
    const parsedId = parseInt(id);
    console.log(parsedId);
    if(isNaN(parsedId)){
        return response.status(400).send({msg: "bad request"});
    }   

    
    // id existance checker
    const findUser = mock_users.find((user) => user.id === parsedId);
    if(!findUser){
        return response.status(400).send("user doesnt exist");
    }

    // id details returner
    return response.status(200).send(findUser);
});


app.post('/api/users', (request, response)=>{
    
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


app.put('/api/users/:id', (request, response) => {
    // destructuring params and body
    const id = request.params.id;
    const parsedId = parseInt(id);
    const body = request.body;

    // finding the user
    const userIndexById = mock_users.findIndex((element) => element.id === parsedId); 
    console.log(userIndexById);

    // condition if not found
    if(userIndexById === -1){ return response.status(400).send(); }

    // update
    mock_users[userIndexById] = {id:parsedId, ...body};
    console.log(mock_users[userIndexById]);

    return response.sendStatus(200);
});

console.log("Server file loaded");
app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});

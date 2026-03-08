const helloJS = require("./hello.js");

// helloJS is asigned to the standalone exported function
helloJS("stephen");


// exported multiple functions
const todo = require("./todo.js");

todo.addTask();
todo.deleteTask();
todo.viewTask();
console.log(todo.random);

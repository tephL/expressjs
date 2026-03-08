const EventEmitter = require("events");
const emitter = new EventEmitter();


function sayHello(name){
    name = "Stephen";
    console.log(`Hello ${name}!`);
}


function happyBirthday(){
    console.log(`Happy Birthday! ${"Stephen"}!`);
}

// register an event listener
emitter.on('userLogin', sayHello);
emitter.on('userBirthday', happyBirthday);

// generate event
emitter.emit('userLogin');
setTimeout( () => { emitter.emit('userBirthday'); }, 3000);



npm init -y
npm i express
npm i -D nodemon
    - `-D` declares dev dependency
npm run "script:name"

scripts
    - "start:dev": "nodemon ./src/index.js"
    - "start": "node ./src/index.js"

type
    - "module"
        - to use esm as module system
        - modern import/export system
        - has to use .mjs extension

import express from 'express';
    - has to be invoked as a function
    - `const app = express()`

methods:
    - .listen(PORT, ())

`process.env.PORT`
    - environment variable

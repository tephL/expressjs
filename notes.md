# ExpressJS

## Initialization

    1. Structure
        + `npm [i | init | run] [-y | -D] <library | module | tools>`
        * frameworks
            - express
        * tools
            - nodemon
    2. Script configs
        + `{ key : "nodemon <PATH>" }`
        + type : module
            - for .mjs


## Express

    1. Initialization
        + `import Express from 'express'`
        - initiate as app()
    2. app()
        + `.listen(PORT, callback)`
        + `.<method>(</path>, (request, response))`


## Request & Response Cycle

    1. Request
        + .body -> parsed with [1] Middlewares
        + .params
        + .query
    2. Response
        + .send()
        + .status()
        + .sendStatus()


## Request Methods

    1. get()
    2. post()
    3. put()
    4. patch()
    5. delete()


## Middlewares

    + `middlewareFunc(req, res, next)`
    * types
        + global: `app.use(middlewareFunc)`
        + specific: chained within the app method

    1. express.json()
    2. express-validator
        + npm i


## Params 

    1. Route
    + `.get('/abc/:id')`
    - specific values

    2. Query 
    + `abcd.com/users?key=value`
    - filtering, sorting, searching

# Routers
- separation of domains


## Usage
1. making routers/
    - where your different domains would be located
2. `import { Routers } from "express" `
3. `const <router> = Router()`
    - this would be used instead of `app.`
4. `export default <router>`
5. `import <exportedRouter> from "./router/<file.mjs>"`
6. `app.use(<exportedRouter>)`


## Organizing Routers
* router/index.mjs
    - utilized by:
        - importing all routers here
        - using all routers
    - this way, only one import is done to the src's index


## Notes
- those enclosed within '<>' in code blocks are user defined
* exporting named constants
    - for middlewares, constants+
    1. .utils/constants.mjs
    2. `export const <>` 
    3. `import { <const> } from 'constants.mjs'` 

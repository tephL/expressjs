## middleware

- function that has logic
- has access to request, response
- the middleman between enddpoints so that theres achoice to proceed to the next function: through next 
- could exist either independently or among all request handlers

* app.use(middlewareFunc)
    - uses middleware globally
    - only http functions that are after the app.use invocation
- app.METHOD(ROUTE, middlewareFunc)
    - uses it independently
* middlewareFunc
    - (req, res, next)


## express-validator

- server-side validating
- basically a helper for error handling if the query is empty or lacks any value
- validating query parameters

* npm i express-validator
* import { query, body, validationResult } from 'express-validator';

* query(PARAM) | body(KEY:value)
    - act as a middleware
    - attaches a new property to the request obj
    * methods
        - .isString()
        - .notEmpty()
        - .isLength({min: , max:})
        - .withMessage(str)
        * chained together with .query()

* validationResult(request)
    - returner of the valiadator result specifically

* SCHEMA helper
    1. utils/
    2. validationSchemas.js
        ```
            export const xxx = {
                property | query: {
                    validatorMtd: {
                        options: {
                            min: , max: ,
                        },
                        errorMessage: ""
                    },
                    validatorMtd: true

                    }
                }
            }
        ```
    3. access thru import { xxx } from "../utils/xxxx.js"
    4. use with checkSchema( xxx )

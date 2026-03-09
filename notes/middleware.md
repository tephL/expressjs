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

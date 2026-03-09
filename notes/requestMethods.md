### app.METHOD(route, (req, res))

* request
    - .body
    - .params
    - .query
* response
    - .sendStatus()
    - .send()
    - .status()


### GET route

- for getting values, or read operations

*`app.get()`
* request
    - .params
        - taken from the route params
        - .FIELDNAME - returns a single key:value pair
    - .query
        - accesses the key=value pair after ? in route
        - parsed as a JSON obj 
* response
    - .send()
        - plain text
        - JSON
    - .status(CODE)
        - chained with .send()



### POST route

* `app.post()`
* request
    -.body
        -`app.use(express.json())`
        - body of the POST request
        - must be parsed with a middleware:
            - function to be invoked before request handling so it could be read properly


### PATCH request

- updates an existing record (and only existing properties) partially



### PUT request

- updating every single field of the record

*`app.put()`
* request
    - .body
    - .params
* response
    - .sendStatus()



### DELETE request



> parseInt(VAL)
> isNaN()
> return ... - stops proceeding operations
> /api
>   - for API's
> different http verbs can distinguish itself independent of the route

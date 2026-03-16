### Sessions
- giving the server memory

1. Midleware
    - npm i express-session
    - import session ...
    - app.use(session())

2. Secret
    - inside the session instance 
    * {}
        + secret: str
        + saveUninitialized: bool
            - ideally false
        + resave: bool
        + cookie: {}
            + maxAge: int ms

### Usage
1. Request Object
    - .session
    - .session.id
    - .sessionStore.get()
        + .session.id, callback(err, sessionData)

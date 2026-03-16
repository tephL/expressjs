### HTTP
- is stateless


### Cookies
1. Response Object
    * .cookie()
        * params:
            + key : value
            + { maxAge : ms }
            + { signed : bool }

2. Request Object
    * .cookies
        - needs to be parsed
    * .headers.cookie
    * .signedCookies
        + .KEY -> property to access
        - could be extended to the assigned key of cookie 

3. Cookie Parser
    * npm i cookie-parser
    * import cookieParser from ...
    * app.use(...)
    + cookieParser(str SignedCookies)

4. Usage
    * access control
        - `if req.cookies.key && req.cookies.KEY === ...` 
        - req.signedCookies

/*  http
 *      - a module for making a server
 *
 *
 *  methods
 *      + createServer( callback(req, res) )
 *          - the request and response object is stored in their respective parameter order
 *          + .listen( port, callback )
 *
 *  request
 *      + .url
 *  
 *
 *  response
 *      + .writeHead( statusCode, {content-type} )
 *          * content types:
 *              - application/json
 *              - text/css
 *              - text/html
 *              - text/plain
 *              - text/javascript
 *              - image/svg+xml
 *      + .write("")
 *      + .end()
 *
 */

const http = require("http");

const server = http.createServer( (req, res) => { 
    if(req.url == "/"){
        res.writeHead(200, {"content-type" : 'text/html'});
        res.write("<h1>Hello! This is the Home Page</h1>");
        res.end();
    } else if(req.url = "/about"){
        res.writeHead(200, {"content-type" : 'text/html'});
        res.write("<h1>Hello! This is the About Page</h1>");
        res.end();
    } else{
        res.writeHead(200, {"content-type" : 'text/html'});
        res.write('<h1>Badddd</h1><br><a href="/">back to homepage</a>');
        res.end();
    }
});

server.listen(5000, () => {
    console.log("server has started on port 5000");
});

const fs = require("fs");
const http = require("http");


const homeHTML = fs.readFileSync("./index.html");
const homeCSS = fs.readFileSync("./styles.css");
const homeLOGO = fs.readFileSync("./logo.svg");
const homeLOGIC = fs.readFileSync("./browserapp.js");


const server = http.createServer( (req, res) => {
    const url = req.url;
    console.log(url);

    if(url == "/"){
        res.writeHead(200, {"content-type" : 'text/html'});
        res.write(homeHTML);
        res.end();
    } else if(url == "/styles.css"){
        res.writeHead(200, {"content-type" : 'text/css'});
        res.write(homeCSS);
        res.end();
    } else if(url == "/logo.svg"){
        res.writeHead(200, {"content-type" : 'image/svg+xml'});
        res.write(homeLOGO);
        res.end();
    } else if(url == "/browserapp.js"){
        res.writeHead(200, {"content-type" : 'text/javascript'});
        res.write(homeLOGIC);
        res.end();
    } else{
        res.writeHead(400, {"content-type" : 'text/plain'});
        res.write("bruh no");
        res.end();
    }
});


server.listen(5000, () => {
    console.log("server started at port 5000");
});

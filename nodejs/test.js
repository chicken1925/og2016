var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(
        200,
        {
            'Content-Type':'text/html'
        }
    );// END writeHead
    res.end('<h1>Hello Node</h1>');
});//END createServer
server.listen(8080);
console.log('server started on 8080');

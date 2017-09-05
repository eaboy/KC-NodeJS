// cargar la librería http

const http = require('http');

// definir un servidor 

const server = http.createServer(function(request, response){
    // cada petición que reciba el servidor ejecuta esta función
    response.writeHead(200, {'Content-type': 'text/html'});
    response.end('Wake up, <b>Neo</b>...\n');
});

// arrancar el servidor
server.listen(1337, '127.0.0.1');
console.log('Servidor arrancado en http://localhost:1337');
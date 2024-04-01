const WebSocket = require('websocket').server;
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Chat Server\n');
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});

const wsServer = new WebSocket({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);

    connection.on('message', (message) => {
        console.log(`Received message: ${message.utf8Data}`);
        wsServer.broadcast(message.utf8Data);
    });

    connection.on('close', () => {
        console.log('Connection closed');
    });
});


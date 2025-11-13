const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8443 });

server.on('connection', socket => {
    console.log('Client connected');

    socket.on('message', message => {
        console.log(`Received message from client: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    socket.send('Sent from websocket server');
});

// testing:
const express = require('express');
const app = express();

app.use(express.json());

app.listen(8443, () => {
    console.log('Server listening on port 8443');
});

app.get('/', (req, res) => {
    const ip = req.socket.remoteAddress || 'unknown';
    console.log('Received GET request');
    console.log(`Client IP: ${ip}`);
});

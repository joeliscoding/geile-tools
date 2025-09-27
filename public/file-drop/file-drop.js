const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = ({ data }) => {
    console.log(`Message from server: ${data}`);
};

console.log('JavaScript loaded');

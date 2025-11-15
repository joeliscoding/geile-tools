const socket = new WebSocket(`ws://${window.location.hostname}:443`);

socket.onmessage = ({ data }) => {
    console.log(`Received message from server: ${data}`);
};

console.log('JavaScript loaded');

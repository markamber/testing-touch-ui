const WebSocket = require('ws');
const { updateSliders, updateMeters } = require('./state'); // Manage state externally
const { state } = require('./meters')

// Start WebSocket server and broadcast state
function createWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    // Send initial state and updates to all clients
    const broadcastState = () => {
        const message = JSON.stringify(state);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };

    // Broadcast state every 50 ms
    setInterval(broadcastState, 50);

    // Handle new client connections
    wss.on('connection', (ws) => {
        console.log('New client connected');
        ws.send(JSON.stringify(state)); // Send the current state

        ws.on('message', async (data) => {
            try {
                const clientState = JSON.parse(data);
                // do something with message?
            } catch (error) {
                console.error('Error processing client message:', error);
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    return wss;
}

module.exports = { createWebSocketServer };

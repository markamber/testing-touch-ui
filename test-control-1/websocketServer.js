const WebSocket = require('ws');
const { state, updateSliders, updateMeters } = require('./state'); // Manage state externally
const { qrcEvents, setSliderValues } = require('./qrcClient');

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
                if (clientState.sliders && Array.isArray(clientState.sliders)) {
                    updateSliders(clientState.sliders);
                    await setSliderValues(clientState.sliders);
                }
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

// Subscribe to QRC meter updates and update WebSocket clients
qrcEvents.on('meterUpdate', (meters) => {
    updateMeters(meters); // Update the shared state with new meter values
});

module.exports = { createWebSocketServer };

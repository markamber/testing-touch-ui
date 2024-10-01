const { startServer } = require('./server');
const { createWebSocketServer } = require('./websocketServer');

// Start the Express server
const server = startServer();

// Start the WebSocket server
createWebSocketServer(server);

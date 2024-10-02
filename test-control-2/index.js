const { startServer } = require('./server');
const { createWebSocketServer } = require('./websocketServer');
const { startDb } = require('./database')
const { startConnector } = require('./qsysConnector')

// Start the Express server
const server = startServer();

// Create database
startDb()

startConnector()

// Start the WebSocket server
createWebSocketServer(server);

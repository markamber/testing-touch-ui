// Import WebSocket and HTTP libraries
const WebSocket = require("ws");
const http = require("http");

// Create an HTTP server and a WebSocket server on top of it
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Initialize the faders and meters arrays
let faders = Array(8).fill(0); // Persisted fader values
let meters = Array(8).fill(0); // Randomized meter values

const MESSAGE_TYPE = {
    INITIAL_DATA: "INITIAL_DATA",
    UPDATE_FADERS: "UPDATE_FADERS",
    UPDATE_METERS: "UPDATE_METERS",
};

const randomizeMeters = () => {
    meters = meters.map((currentValue) => {
        // Set the range for human speech (-60 dB to -10 dB)
        const minDb = -60;
        const maxDb = -10;

        // Calculate a smooth variation based on current value
        let variation = Math.random() * 10 - 5; // A slight variation between -5 and +5

        // Calculate the new value by applying the variation to the current value
        let newValue = currentValue + variation;

        // Ensure the new value stays within the realistic range of human speech
        if (newValue < minDb) newValue = minDb;
        if (newValue > maxDb) newValue = maxDb;

        return newValue;
    });
};


// Broadcast meters to all connected clients every 30 milliseconds
const broadcastMeters = () => {
    randomizeMeters();
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(
                JSON.stringify({
                    type: MESSAGE_TYPE.UPDATE_METERS,
                    payload: {meters: meters},
                }),
            );
        }
    });
};

// Listen for new WebSocket connections
wss.on("connection", (ws) => {
    console.log("Client connected.");

    // Send the initial faders and meters data to the newly connected client
    ws.send(
        JSON.stringify({
            type: MESSAGE_TYPE.INITIAL_DATA,
            payload: {
                faders: faders,
                meters: meters,
            },
        }),
    );

    // Listen for incoming messages from the client
    ws.on("message", (message) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === MESSAGE_TYPE.UPDATE_FADERS) {
            // Update the faders array with the new values
            faders = parsedMessage.payload.faders;

            // Broadcast the updated fader values to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(
                        JSON.stringify({
                            type: MESSAGE_TYPE.UPDATE_FADERS,
                            payload: {faders: faders},
                        }),
                    );
                }
            });

        }
    });

    // Listen for the 'close' event to log when a client disconnects
    ws.on("close", () => {
        console.log("Client disconnected.");
    });
});

// Start broadcasting meter values every 30 milliseconds
setInterval(broadcastMeters, 1000);

// Start the server and listen on a specific port
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

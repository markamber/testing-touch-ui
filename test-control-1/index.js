const QrcClient = require('qsys-qrc-client').default;
const commands = require('qsys-qrc-client').commands;
const WebSocket = require('ws');
const express = require('express');

const client = new QrcClient();
client.connect({
    port: 1710,
    host: '192.168.20.173'
});

// Object representing the state of 8 sliders and 8 audio meters
let state = {
    sliders: Array(8).fill(0),  // Initialize sliders with 0
    audioMeters: Array(8).fill(0),  // Initialize audio meters with 0
};




/**
 * Function to update the audioMeters state based on incoming meter data
 * @param {Array} meterData - Array of meter objects with properties Component, Name, String, Value, Position
 * @param {Object} state - The current state object containing sliders and audioMeters
 */
function updateAudioMetersFromState(meterData, state) {
    meterData.forEach(meter => {
        if (meter.Component === 'meters' && meter.Name.startsWith('peak.')) {
            // Extract the meter index number from the Name (e.g., 'peak.1' => 1)
            const meterIndex = parseInt(meter.Name.split('.')[1], 10) - 1;

            // Ensure the meterIndex is within bounds (0 to 7)
            if (meterIndex >= 0 && meterIndex < state.audioMeters.length) {
                state.audioMeters[meterIndex] = meter.Value;
            }
        }
    });
}

async function playMixer() {
    // The send function returns Promises, use the await syntax for synchronous-like code flow.


    const myCommand = {
        "method": "Component.GetControls",
        "params": {
            "Name": "mixer"
        }
    }

    const response = await client.send(myCommand)

    const sendVolume = (volume) => ({
            "Name": "input.10.gain",
            "Value": volume
        }
    )

    const volResponse = await client.send(commands.setComponentControls("mixer",[sendVolume(-65.0)]))


    console.log(response.Controls[0])
    console.log(volResponse)
    //console.log(`${status.DesignName} is running on a ${status.Platform}`);
    //=> "My Test Design is running on a Emulator"
}

async function playMeter() {
    try {
        // Step 1: Send a command to get controls
        const myCommand = {
            "method": "Component.GetControls",
            "params": {
                "Name": "meters"
            }
        };

        const response = await client.send(myCommand);

        // Step 2: Send volume control command
        const sendVolume = (volume) => ({
            "Name": "input.10.gain",
            "Value": volume
        });

        const volResponse = await client.send(commands.setComponentControls("mixer", [sendVolume(-65.0)]));

        // Step 3: Add component controls to the group
        await client.send(commands.addComponentControlsToGroup('meterfun', 'meters', ['peak.1', 'peak.2', 'peak.3', 'peak.4', 'peak.5', 'peak.6', 'peak.7', 'peak.8']));

        console.log('Component controls added to group successfully');

        // Step 4: Set up the observable after the group has been added
        const observable = client.pollGroup('meterfun', 0.1);

        // Step 5: Subscribe to observable to get meter data
        observable.subscribe(data => {
            console.log(data)

            for (const change of data.Changes) {
                if (change.Name.startsWith('peak.')) {
                    // Extract the number from 'peak.X'
                    const meterIndex = parseInt(change.Name.split('.')[1], 10) - 1;

                    // Ensure the meterIndex is within bounds (0 to 7)
                    if (meterIndex >= 0 && meterIndex < state.audioMeters.length) {
                        // Update the corresponding audio meter in state
                        state.audioMeters[meterIndex] = change.Value;
                        console.log(`Updated audio meter ${meterIndex + 1} with value: ${change.Value}`);
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error in playMeter function:', error);
    }
}

// Call the playMeter function
playMeter();


const app = express();
const port = 3000;

// Create WebSocket server on the same port
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });



// Broadcast state to all connected clients every second
setInterval(() => {
    // Assuming state contains volume values that need to be mapped to slider values
    const transformedState = {
        ...state,
        audioMeters: state.audioMeters.map(volume => volume + 100)  // Transform volume to slider values
    };

    const message = JSON.stringify(transformedState);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}, 50);

const sendVolume = (inputNumber, volume) => ({
    "Name": `input.${inputNumber}.gain`,
    "Value": volume
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send initial state to the client
    ws.send(JSON.stringify(state));

    ws.on('message', async (data) => {
        try {
            const clientState = JSON.parse(data);

            // Check if clientState contains slider values and that they are valid
            if (clientState.sliders && Array.isArray(clientState.sliders) && clientState.sliders.length === 8) {
                state.sliders = clientState.sliders;

                // Iterate over all sliders and send volume change commands for each
                for (let i = 0; i < state.sliders.length; i++) {
                    console.log("hi")
                    const sliderValue = state.sliders[i];  // Slider value
                    const inputNumber = i + 1;  // Input number (1-based, e.g., input.1, input.2, etc.)

                    // Send volume control command for each input
                    const volResponse = await client.send(commands.setComponentControls("mixer", [sendVolume(inputNumber, sliderValue)]));
                    console.log(volResponse)
                    console.log(`Sent volume change: ${sliderValue} for input.${inputNumber}`);
                }
            }
        } catch (error) {
            console.error('Error processing client message:', error);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to map the slider value (e.g., 0-100) to a volume range (e.g., -100 to +10 dB)
const mapSliderToVolume = (sliderValue) => {
    // Assuming sliderValue is between 0 and 100, map it to the range -100 dB to 0 dB
    const minVolume = -100;
    const maxVolume = 10;
    return (sliderValue / 100) * (maxVolume - minVolume) + minVolume;
};

// Function to map the volume (e.g., -100 to +10 dB) back to a slider value (e.g., 0-100)
const mapDbToScale = (volume) => {
    const minVolume = -100;
    const maxVolume = 10;
    return ((volume - minVolume) / (maxVolume - minVolume)) * 100;
};

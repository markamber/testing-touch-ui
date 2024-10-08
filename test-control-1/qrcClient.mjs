import QrcClient, {commands} from "qsys-qrc-client";

import EventEmitter from "events";

const client = new QrcClient.default();
client.connect({
    port: 1710,
    host: '192.168.20.173',
});

const qrcEvents = new EventEmitter();

const sendVolume = (inputNumber, volume) => ({
    Name: `input.${inputNumber}.gain`,
    Value: volume,
});

// Function to fetch and observe audio meters
async function setupMeters() {
    try {

        await client.send(
            commands.addComponentControlsToGroup('meters', 'meters', [
                'peak.1',
                'peak.2',
                'peak.3',
                'peak.4',
                'peak.5',
                'peak.6',
                'peak.7',
                'peak.8',
            ])
        );

        const observable = client.pollGroup('meters', 0.05);

        observable.subscribe((data) => {
            const meters = Array(8).fill(0);
            for (const change of data.Changes) {
                if (change.Name.startsWith('peak.')) {
                    const meterIndex = parseInt(change.Name.split('.')[1], 10) - 1;
                    if (meterIndex >= 0 && meterIndex < meters.length) {
                        meters[meterIndex] = change.Value;
                    }
                }
            }
            qrcEvents.emit('meterUpdate', meters);
        });
    } catch (error) {
        console.error('Error in setupMeters function:', error);
    }
}

// API for controlling the QRC client
const setFaderValue = async (faderNum, value) => {
        await client.send(commands.setComponentControls('mixer', [sendVolume(faderNum, value)]));
};

// Initialize the setupMeters function
setupMeters();

export {qrcEvents, setFaderValue}

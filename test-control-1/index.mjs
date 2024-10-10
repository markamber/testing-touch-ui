import {initializeAndStartServer} from '@splcode/state-server'
import path from 'node:path';
import createRtspToHlsServer from './server.js';
const driversPath = path.resolve('./drivers')

const config = {
    driversPath: driversPath,
    defaultDriverConfig:
        {
            syncIntervalMs: 5000,
            setThrottleMs: 50,
            unlockMeterDebounceMs: 100
        }
    ,
    devices: {
        jim: {
            driver: "MockDevice",
            driverConfig:
                {
                    syncIntervalMs: 1000
                },
            config: {
                yourDeviceSpecificConfigHere: "192.168.1.123"
            }
        },
        gary: {
            driver: "MockDevice",
            driverConfig:
                {
                    unlockMeterDebounceMs: 5000
                },
            config: {
                yourDeviceSpecificConfigHere: "192.168.1.79"
            }
        },
        cart: {
            driver: "PodcartCore",
            config: {
                host: '192.168.20.173'
            },
        },
        cam1: {
            driver: "CanonCam",
            config: {
                host: '192.168.20.173'
            },
        }
    }

};

initializeAndStartServer({driversPath: driversPath, config});

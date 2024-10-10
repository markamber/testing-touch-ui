import { AbstractDriver } from '@splcode/state-server';
import QrcClient, {commands} from "qsys-qrc-client";

import EventEmitter from "events";

const client = new QrcClient.default();


let meterCache = [-200,-200,-200,-200,-200,-200,-200,-200]
let faderCache = [-200,-200,-200,-200,-200,-200,-200,-200]

const meterMap = [
    [1,1],
    [2,2],
    [3,3],
    [4,4],
    [5,6],
    [6,8]
]

const inputMap = [
    [1,1],
    [2,2],
    [3,3],
    [4,4],
    [5,17],
    [6,18]
]

function kv(map, key) {
    return map.find(f => f[0]===key)[1]
}

function vk(map, value) {
    return map.find(f => f[1]===value)[0]
}

export default class PodcartCore extends AbstractDriver {
    thingy = Math.floor(Math.random() * 100);

    async _connect() {
        this.log.info('There is a config!', this.config);

        client.connect({
            port: 1710,
            host: this.config.host,
        });

        const current = await getCurrentState()

        meterCache = current.meters.Controls.map(c => c.Value)

        faderCache = current.faders.Controls.map(c => c.Value)
        console.log(faderCache)

        this._registerMeter('mixer/meter1', meterCache[0]);
        this._registerMeter('mixer/meter2', meterCache[1]);
        this._registerMeter('mixer/meter3', meterCache[2]);
        this._registerMeter('mixer/meter4', meterCache[3]);
        this._registerMeter('mixer/meter5', meterCache[4]);
        this._registerMeter('mixer/meter6', meterCache[5]);

        this._registerMeter('mixer.fader1', faderCache[0]);
        this._registerMeter('mixer.fader2', faderCache[1]);
        this._registerMeter('mixer.fader3', faderCache[2]);
        this._registerMeter('mixer.fader4', faderCache[3]);
        this._registerMeter('mixer.fader5', faderCache[4]);
        this._registerMeter('mixer.fader6', faderCache[5]);


        await this.setupMeters();

    }

    async _disconnect() {
    }

    async _get(meterName) {
        if (meterName.startsWith('mixer.fader')) {
            return faderCache[parseInt(meterName.substring(meterName.length-1))-1]
        } else if (meterName.startsWith('mixer/meter')){
            return meterCache[parseInt(meterName.substring(meterName.length-1))-1]
        }

    }

    async _set(meterName, value) {
        if( meterName.startsWith('mixer.fader')){
            const ending = meterName.substring(meterName.length-1)
            const meterNum = parseInt(ending)
            const qsysFader = kv(inputMap, meterNum)
            faderCache[meterNum-1] = value
            return await setFaderValue(qsysFader, value)
        }

    }


    async setupMeters() {
        try {

            await client.send(
                commands.addComponentControlsToGroup('meters', 'meters', meterMap.map(m => `peak.${m[1]}`))
            );

            const observable = client.pollGroup('meters', {rate: 0.05});

            observable.subscribe((data) => {

                for (const change of data.Changes) {
                    if (change.Name.startsWith('peak.')) {
                        const meterIndex = parseInt(change.Name.split('.')[1], 10);
                        const meterId = vk(meterMap, meterIndex)
                        if (meterId) {
                            this._meterEcho(`mixer/meter${meterId}`, change.Value);
                            meterCache[meterId-1] = change.Value;
                        }
                    }
                }
                //console.log(meterCache)
            });
        } catch (error) {
            console.error('Error in setupMeters function:', error);
        }
    }

}

const sendVolume = (inputNumber, volume) => ({
    Name: `input.${inputNumber}.gain`,
    Value: volume,
});

async function getCurrentState(){

    const meters = client.send(commands.getComponentControls('meters', meterMap.map(m => `peak.${m[1]}`)))
    const faders = client.send(commands.getComponentControls('mixer', inputMap.map(m => `input.${m[1]}.gain`)))
    return {
        meters: await meters,
        faders: await faders
    }

}

// Function to fetch and observe audio meters


// API for controlling the QRC client
const setFaderValue = async (faderNum, value) => {
    await client.send(commands.setComponentControls('mixer', [sendVolume(faderNum, value)]));
};
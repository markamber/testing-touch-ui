import { AbstractDriver } from '@splcode/state-server';
import {ViscaCommand, ViscaController} from '@br8kppooint/visca'

let cameras = new ViscaController()
let camera

export default class ViscaCam extends AbstractDriver {
    thingy = Math.floor(Math.random() * 100);

    async _connect() {
        this.log.info('There is a config!', this.config);


        camera = cameras.addIPCamera({port: 52380, id:1 , ip:'192.168.20.112', name:'cam1'})
        camera.sendCommand(ViscaCommand.cmdCameraPanTiltHome(1))


        this._registerMeter('thingy', this.thingy);
    }

    async _disconnect() {
    }

    async _get(meterName) {
        this.thingy += 1;
        return this.thingy % 100;
    }

    async _set(meterName, value) {
        this.log.info('SET', meterName, value);
        this.thingy = value;
    }
}
